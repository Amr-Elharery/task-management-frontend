import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TaskPaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TaskPagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
}: TaskPaginationProps) {
  if (total == 0) {
    return null;
  }
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    onPageChange(newPage);
  };

  return (
    <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Results Info */}
      <p className="text-center text-sm text-muted-foreground sm:text-left">
        Showing{' '}
        <span className="font-medium text-foreground">
          {start}-{end}
        </span>{' '}
        of <span className="font-medium text-foreground">{total}</span> tasks
      </p>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          {/* Previous */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                type="button"
                variant={pageNumber === page ? 'default' : 'outline'}
                size="icon"
                onClick={() => goToPage(pageNumber)}
                aria-label={`Page ${pageNumber}`}
                aria-current={pageNumber === page ? 'page' : undefined}
              >
                {pageNumber}
              </Button>
            ),
          )}

          {/* Next */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
