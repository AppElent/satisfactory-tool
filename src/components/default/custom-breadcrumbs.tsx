import { Box, Breadcrumbs, Link, Menu, MenuItem, Stack } from '@mui/material';

import paths, { PathItem } from '@/config/paths';

import useIsMobile from '@/hooks/use-is-mobile';
import useRouter from '@/hooks/use-router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, matchPath } from 'react-router-dom';

const generateBreadcrumbs = (breadcrumbsConfig: PathItem[], pathname: string) => {
  const breadcrumbs: PathItem[] = [];
  let accumulatedPath = '';

  // Split the current pathname into segments
  const segments = pathname.split('/').filter(Boolean);

  for (const segment of segments) {
    accumulatedPath += `/${segment}`;

    // Match the current accumulated path to a route
    const matchedRoute = breadcrumbsConfig.find((route) =>
      matchPath(route.to || '', accumulatedPath)
    );

    if (matchedRoute) {
      breadcrumbs.push({ ...matchedRoute });
    }
  }

  // The last breadcrumb should not be clickable
  if (breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].to = undefined;
  }

  return breadcrumbs;
};

interface CustomBreadcrumbsProps {
  currentPage?: string;
  switchOptions?: {
    label: string;
    key: string;
  }[];
}

const CustomBreadcrumbs = ({ currentPage, switchOptions }: CustomBreadcrumbsProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const items = generateBreadcrumbs(paths, window.location.pathname);

  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (item: { label: string; key: string }) => {
    // Route to the selectem item by replacing the last segment of the url with the className
    const urlSegments = window.location.pathname.split('/');
    urlSegments[urlSegments.length - 1] = item.key;
    const newUrl = urlSegments.join('/');
    console.log(item, newUrl);
    router.push(newUrl);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // If currentPage is set, replace the last item with it
  if (currentPage) {
    items[items.length - 1].label = currentPage;
  }

  return (
    <>
      {items.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            maxItems={isMobile ? 2 : 8}
          >
            {items.map((item, index) => {
              const value = item.translationKey ? t(item.translationKey) : item.label;
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  key={index}
                >
                  <Box sx={{ mr: 0.5 }}>{item.Icon && item.Icon}</Box>
                  <Box>
                    {item.to ? (
                      <Link
                        key={index}
                        component={RouterLink}
                        to={item.to}
                        //underline="hover"
                        color="inherit"
                      >
                        {value}
                      </Link>
                    ) : (
                      <>
                        {switchOptions ? (
                          <>
                            <Link
                              key={index}
                              component="button"
                              onClick={handleClick}
                              color="inherit"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                              >
                                <Box>{value}</Box>
                                <ArrowDropDownIcon />
                              </Stack>
                            </Link>
                            {/* <IconButton size="small">
                              <ArrowDropDownIcon />
                            </IconButton> */}
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              {switchOptions.map((dropdownItem, dropdownIndex) => (
                                <MenuItem
                                  key={dropdownIndex}
                                  // component={RouterLink}
                                  // to={dropdownItem.to}
                                  selected={dropdownItem.key === item.id}
                                  onClick={() => handleItemClick(dropdownItem)}
                                >
                                  {dropdownItem.label}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        ) : (
                          <>{value}</>
                        )}
                      </>
                    )}
                  </Box>
                </Stack>
              );
              // return item.to ? (
              //   <Stack
              //     direction="row"
              //     alignItems="center"
              //     key={index}
              //   >
              //     <Box sx={{ mr: 0.5 }}>{item.Icon && item.Icon}</Box>
              //     <Box>
              //       <Link
              //         key={index}
              //         component={RouterLink}
              //         to={item.to}
              //         //underline="hover"
              //         color="inherit"
              //       >
              //         {value}
              //       </Link>
              //     </Box>
              //   </Stack>
              // ) : (
              //   <Stack
              //     direction="row"
              //     alignItems="center"
              //     key={index}
              //   >
              //     <Box sx={{ mr: 0.5 }}>{item.Icon && item.Icon}</Box>
              //     <Typography
              //       key={index}
              //       color="textPrimary"
              //     >
              //       {/* {item.Icon && item.Icon} */}
              //       {value}
              //     </Typography>
              //   </Stack>
              // );
            })}
          </Breadcrumbs>
        </Box>
      )}
    </>
  );
};

export default CustomBreadcrumbs;
