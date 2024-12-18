'use client';
import * as React from 'react';
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

const LOCALE = 'en';

export default function AppLayoutPreview() {
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
              { text: 'Chat List', href: '#'},
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
            items={[{ type: 'link', text: `Chat List`, href: `#` },
                    { type: 'link', text: `Help`, href: `#` }

            ]}
            
          />
        }
        notifications={
          <Flashbar
            items={[
              {
                type: 'info',
                dismissible: true,
                content: 'This is an info flash message.',
                id: 'message_1',
              },
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
          item.name
      }}
      columnDefinitions={[
        {
          id: "variable",
          header: "Timestamp",
          cell: item => <Link href="#">{item.name}</Link>,
          sortingField: "name",
          isRowHeader: true
        },
        {
          id: "value",
          header: "Status",
          cell: item => item.alt,
          sortingField: "alt"
        },
        {
          id: "type",
          header: "Agent",
          cell: item => item.type
        },
        {
          id: "description",
          header: "CSAT",
          cell: item => item.description
        }
      ]}
      columnDisplay={[
        { id: "variable", visible: true },
        { id: "value", visible: true },
        { id: "type", visible: true },
        { id: "description", visible: true }
      ]}
      enableKeyboardNavigation
      items={[
        {
          name: "2024-12-01 08:21:10",
          alt: "Open",
          description: "4",
          type: "orvital",
          size: "Small"
        },
        {
          name: "Item 2",
          alt: "Second",
          description: "This is the second item",
          type: "1B",
          size: "Large"
        },
        {
          name: "Item 3",
          alt: "Third",
          description: "-",
          type: "1A",
          size: "Large"
        },
        {
          name: "Item 4",
          alt: "Fourth",
          description: "This is the fourth item",
          type: "2A",
          size: "Small"
        },
        {
          name: "Item 5",
          alt: "-",
          description:
            "This is the fifth item with a longer description",
          type: "2A",
          size: "Large"
        },
        {
          name: "Item 6",
          alt: "Sixth",
          description: "This is the sixth item",
          type: "1A",
          size: "Small"
        }
      ]}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
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
        <Header
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/10)"
              : "(10)"
          }
        >
          Table with common features
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
        splitPanel={<SplitPanel header="Split panel header">Split panel content</SplitPanel>}
      />
    </I18nProvider>
  );
}
