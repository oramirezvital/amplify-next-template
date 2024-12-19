'use client';
import * as React from 'react';

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
const client = generateClient<Schema>();



import {
  AppLayout,
  BreadcrumbGroup,
  Container,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  Link,
  SideNavigation,
  SplitPanel,
} from '@cloudscape-design/components';
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";

import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import Icon from "@cloudscape-design/components/icon";

const LOCALE = 'en';

export default function AppLayoutPreview() {

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);



  const [
    selectedItems,
    setSelectedItems
  ] = React.useState([{ name: "Item 2" }]);

  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Post Chat Analytics', href: '#' },
              { text: 'Chat List', href: '#' },
            ]}
          />
        }
        navigationOpen={true}
        navigation={
          <SideNavigation
            header={{
              href: '#',
              text: 'Post Chat Analytics',
            }}
            items={[
            { type: 'link', text: `Chat List`, href: `#` },
            { type: 'link', text: `Upload transcript`, href: `#` },
            { type: 'link', text: `Sign out`, href: `#` }
            ]}

          />
        }

        //toolsOpen={true}
        //tools={<HelpPanel header={<h2>Overview</h2>}>Help content</HelpPanel>}
        content={
          <ContentLayout
            header={
              <Header variant="h1" info={<Link variant="info">Info</Link>}>
                Chat List
              </Header>
            }
          >
            <Container
              header={
                <Header variant="h2" description="Select a chat record to view details.">
                  Chat Details
                </Header>
              }

            >
              <div className="contentPlaceholder" />
              <Table
                renderAriaLive={({
                  firstIndex,
                  lastIndex,
                  totalItemsCount
                }) =>
                  `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                }
                onSelectionChange={({ detail }) =>
                  setSelectedItems(detail.selectedItems)
                }
                selectedItems={selectedItems}
                ariaLabels={{
                  selectionGroupLabel: "Items selection",
                  allItemsSelectionLabel: () => "select all",
                  itemSelectionLabel: ({ selectedItems }, item) =>
                    item.id
                }}
                columnDefinitions={[
                  {
                    id: "id",
                    header: "id",
                    cell: item => <Link href="#">{item.id}</Link>,
                    sortingField: "id",
                    isRowHeader: true
                  },
                  {
                    id: "customerID",
                    header: "customerID",
                    cell: item => item.customerID,
                    sortingField: "customerID"
                  },
                  {
                    id: "agentID",
                    header: "agentID",
                    cell: item => item.agentID
                  },
                  {
                    id: "csat",
                    header: "CSAT",
                    cell: item => item.csat_score
                  },      
                  {
                    id: "churn_risk_score",
                    header: "Churn Risk",
                    cell: item => item.churn_risk_score
                  },  
                  {
                    id: "sentiment_analysis",
                    header: "Sentiment Analysis",
                    cell: item => item.sentiment_analysis
                  },                 
                  {
                    id: "datetime",
                    header: "Date Time",
                    cell: item => item.datetime
                  }
                ]}
                columnDisplay={[
                  { id: "id", visible: true },
                  { id: "customerID", visible: true },
                  { id: "agentID", visible: true },
                  { id: "csat", visible: true },
                  { id: "churn_risk_score", visible: true },
                  { id: "sentiment_analysis", visible: true },
                  { id: "datetime", visible: true },
                ]}
                enableKeyboardNavigation





                items={todos}
                loadingText="Loading resources"
                selectionType="multi"
                trackBy="id"
                resizableColumns
                empty={
                  <Box
                    margin={{ vertical: "xs" }}
                    textAlign="center"
                    color="inherit"
                  >
                    <SpaceBetween size="m">
                      <b>No resources</b>
                      <Button>Create resource</Button>
                    </SpaceBetween>
                  </Box>
                }
                filter={
                  <TextFilter
                    filteringPlaceholder="Find resources"
                    filteringText=""
                  />
                }
                header={
                  <Header>

                  </Header>
                }
                pagination={
                  <Pagination currentPageIndex={1} pagesCount={2} />
                }
                preferences={
                  <CollectionPreferences
                    title="Preferences"
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                    preferences={{
                      pageSize: 10,
                      contentDisplay: [
                        { id: "variable", visible: true },
                        { id: "value", visible: true },
                        { id: "type", visible: true },
                        { id: "description", visible: true }
                      ]
                    }}
                    pageSizePreference={{
                      title: "Page size",
                      options: [
                        { value: 10, label: "10 resources" },
                        { value: 20, label: "20 resources" }
                      ]
                    }}
                    wrapLinesPreference={{}}
                    stripedRowsPreference={{}}
                    contentDensityPreference={{}}
                    contentDisplayPreference={{
                      options: [
                        {
                          id: "variable",
                          label: "Variable name",
                          alwaysVisible: true
                        },
                        { id: "value", label: "Text value" },
                        { id: "type", label: "Type" },
                        { id: "description", label: "Description" }
                      ]
                    }}
                    stickyColumnsPreference={{
                      firstColumns: {
                        title: "Stick first column(s)",
                        description:
                          "Keep the first column(s) visible while horizontally scrolling the table content.",
                        options: [
                          { label: "None", value: 0 },
                          { label: "First column", value: 1 },
                          { label: "First two columns", value: 2 }
                        ]
                      },
                      lastColumns: {
                        title: "Stick last column",
                        description:
                          "Keep the last column visible while horizontally scrolling the table content.",
                        options: [
                          { label: "None", value: 0 },
                          { label: "Last column", value: 1 }
                        ]
                      }
                    }}
                  />
                }
              />
            </Container>
          </ContentLayout>
        }
        splitPanel={<SplitPanel header="Transcript analysis"></SplitPanel>}
      />
    </I18nProvider>
  );
}
