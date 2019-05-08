import { css } from 'styled-components';
import colors from './colors';

export default css`
  .row {
    margin-right: -5px;
    margin-left: -5px;
    [class*="col-"] {
      padding-right: 5px;
      padding-left: 5px;
    }
  }

  .card {
    background-color:${colors.componentColor};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: none;
  }

  .card-body {
    padding: 0.75rem;
  }

  .card-header {
    padding: 0.4rem 1rem;
    border-radius: 0;
  }

  .card-footer {
    padding: 0.4rem 0rem;
    margin: 0 1rem;
    background-color: ${colors.componentColor};
  }

  .table {
    color: black;
    :hover {
      color: darkgray;
    }
  }

  .table-hover tbody tr:hover {
    color: #009fd4;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .table td:hover {
    color: #009fd4;
  }
`;
