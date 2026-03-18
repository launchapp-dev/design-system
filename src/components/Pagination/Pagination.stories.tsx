import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./index";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

function InteractivePaginator() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10;

  const getVisiblePages = () => {
    if (currentPage <= 3) return [1, 2, 3, 4];
    if (currentPage >= totalPages - 2)
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  const handlePage = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-[hsl(var(--ag-muted-foreground))]">
        Page {currentPage} of {totalPages}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => handlePage(e, currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={currentPage === 1}
              onClick={(e) => handlePage(e, 1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {showStartEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {visiblePages
            .filter((p) => p !== 1 && p !== totalPages)
            .map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => handlePage(e, page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {showEndEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={currentPage === totalPages}
              onClick={(e) => handlePage(e, totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => handlePage(e, currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractivePaginator />,
};

export const FirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled
            className="pointer-events-none opacity-50"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const LastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled
            className="pointer-events-none opacity-50"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add("dark");
        return () => document.documentElement.classList.remove("dark");
      }, []);
      return (
        <div className="dark bg-[hsl(var(--ag-background))] p-8">
          <Story />
        </div>
      );
    },
  ],
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
