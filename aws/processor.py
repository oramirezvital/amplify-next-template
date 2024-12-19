
import json
import boto3
from botocore.exceptions import ClientError
import uuid
from datetime import datetime, timezone

# Initialize Bedrock client
bedrock_client = boto3.client('bedrock')

def lambda_handler(event, context):
    print(event)
    # Get the bucket name and file key from the S3 event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    #print(bucket)
    #print(key)
    # Download the JSON file from S3
    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=bucket, Key=key)
    json_data = response['Body'].read().decode('utf-8')
    #print(json_data)
    # Parse the JSON data
    data = json.loads(json_data)
    chat_dt = data["datetime"]
    customer_id = data["customerID"]
    agent_id = data["agentID"]
    transcript = data["transcript"]

    #print(transcript)

    system_prompt = """
    You are a contact center analyst helping to analyze chatbot transcript
    """

    prompt = f"""
    1. Analyze the transcript and provide the next information after analyze the transcript in a JSON format:
    a) summary of the chat transcript in less than 100 words in summary field
    b) csat in a 0-5 scale in csat_score field
    c) csat_score explanation in less than 50 words in csat_explanation field
    d) churn risk in a 0-10 scale  in churn_risk_score field
    e) churn_risk_score explanation in less than 50 words in churn_risk_explanation field
    f) sentiment_analysis as only one these values: Positive, Negative, or Neutral in sentiment_analysis field
    2. <transcript>{transcript}</transcript>
    3. Provide the  summary  and explanations  in Spanish
    4. Show only the JSON
    """

    system_prompts = [
        {
            "text": system_prompt
        }
    ]

    messages = [
        {
            "role": "user",
            "content": [{"text": prompt}]
        }
    ]

    # Create a Bedrock Runtime client in the AWS Region you want to use.
    client = boto3.client("bedrock-runtime", region_name="us-east-1")

    # Set the model ID, e.g., Claude 3 Haiku.
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"

    # Start a conversation with the user message.
    #user_message = "Describe the purpose of a 'hello world' program in one line."
    #conversation = [
    #    {
    #        "role": "user",
    #        "content": [{"text": user_message}],
    #    }
    #]

    top_k = 250
    additional_model_fields = {"top_k": top_k}

    try:
        # Send the message to the model, using a basic inference configuration.
        response = client.converse(
            modelId=model_id,
            #messages=conversation,
            messages=messages,
            system=system_prompts,
            inferenceConfig={"maxTokens": 2000, "temperature": 0.5, "topP": 0.9},
            additionalModelRequestFields=additional_model_fields
        )

        # Extract and print the response text.
        response_text = response["output"]["message"]["content"][0]["text"]
        response_body = json.loads(response_text)
        print(response_body)
        identifier = str(uuid.uuid4())
        response_body["id"] = identifier
        response_body["datetime"] = chat_dt
        response_body["customerID"] = customer_id
        response_body["agentID"] = agent_id
        response_body["input"] = key
        # Store the response JSON in the output S3 bucket with the same key
        output_bucket_name = "chat-analyzer-output"
        response_body["output"] = key
        s3.put_object(Bucket=output_bucket_name, Key=key, Body=json.dumps(response_body))
        print(f"Response JSON stored in S3 bucket '{output_bucket_name}' with key '{key}'")


        # Store the response_body in DynamoDB
        # Get the current timestamp in the desired format
        current_timestamp = datetime.utcnow().isoformat(timespec='milliseconds') + "Z"
        response_body["createdAt"] = current_timestamp
        response_body["updatedAt"] = current_timestamp
        dynamodb = boto3.resource('dynamodb')
        #table = dynamodb.Table('post-chat-analytics')
        
        table = dynamodb.Table('Todo-3napz3pt2zdsjkxfuaslphxdbq-NONE')
        table.put_item(Item=response_body)
        print(f"Response JSON stored in DynamoDB table  with key '{identifier}'")

    except (ClientError, Exception) as e:
        print(f"ERROR:  Reason: {e}")

    return {
        'statusCode': 200,
        'body': json.dumps('Chat transcript summary processed successfully')
    }
