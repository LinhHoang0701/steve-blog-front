import { Box } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectNumberCurrentPage, setNumberCurrentPage } from 'features/articles/articlesSlice';
import React, { useEffect } from 'react';
import { Link, MemoryRouter, Route, useHistory, useLocation } from 'react-router-dom';

const queryString = require('query-string');

interface PaginationComponentProps {
  pathName: string;
  totalPage: number;
  tagByArticle: string | undefined;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pathName,
  totalPage,
  tagByArticle,
}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // get currentPage from store
  const currentPage = useAppSelector(selectNumberCurrentPage);

  // navigate to page event
  const handleNavigate = (event: any, pageNumber: number) => {
    dispatch(setNumberCurrentPage(pageNumber));
    // preserve url param
    const queryParams = tagByArticle
      ? { page: pageNumber, tag: tagByArticle }
      : { page: pageNumber };

    history.push({
      pathname: pathName,
      search: queryString.stringify(queryParams),
    });
  };

  // sync url param with state
  useEffect(() => {
    const { page } = queryString.parse(location.search);
    const pageValue = page ? +page : 1;
    dispatch(setNumberCurrentPage(pageValue));
  }, [location.search, dispatch]);

  return (
    <Box>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Route>
          {() => {
            return (
              <Pagination
                size="large"
                page={currentPage}
                count={totalPage}
                onChange={handleNavigate}
                showFirstButton
                showLastButton
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            );
          }}
        </Route>
      </MemoryRouter>
    </Box>
  );
};

export default PaginationComponent;
