import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbPath {
  label: string;
  url?: string;
}

interface MyBreadcrumbsProps {
  paths: BreadcrumbPath[];
}

const MyBreadcrumbs: React.FC<MyBreadcrumbsProps> = ({ paths }) => {
  return (
    <div>
      {paths.map((path, index) => (
        <span key={path.label}>
          {index > 0 && ' / '}
          {path.url ? (
            <Link to={path.url}>{path.label}</Link>
          ) : (
            <span>{path.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default MyBreadcrumbs;
