import { useState, ChangeEvent } from 'react';
import { PAGE_SIZE } from '@/utils';
import { useDebounce } from '@uidotdev/usehooks';

type SortState = {
  id: string;
  desc: 'asc' | 'desc';
} | null;

export const useUser = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const [sortBy, setSortBy] = useState<SortState>(null);

  const handleSortChange = (columnId: string) => {
    setSortBy((prev) => {
      if (prev?.id === columnId && prev.desc === 'asc') {
        return { id: columnId, desc: 'desc' };
      } else {
        return { id: columnId, desc: 'asc' };
      }
    });

    setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
  };

  const [filters, setFilters] = useState('');
  const filterDebounce = useDebounce(filters, 1000);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(e.target.value);
    setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
  };

  return {
    pagination,
    setPagination,
    sortBy,
    handleSortChange,
    filters,
    handleFilterChange,
    filterDebounce,
  };
};
