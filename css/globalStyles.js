import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import Bootstrap from './bootstrap';

export default createGlobalStyle`
    ${Bootstrap};
    #__next, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Poppins', sans-serif, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${colors.bodyColor};
        color: black;
        font-weight: 400;
        ::selection {
            background-color: ${colors.color1};
            color: white;
        }
        ::-moz-selection {
            color: white;
            background-color: ${colors.color1};
        }
    }
    html {
        height: 100%;
        width: 100%;
        margin: 0;
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 500;
    }

    ul {
    padding-left: 0;
    }

    .field-error {
        color: ${colors.errorColor};
        border-radius: 50px;
    }

    .field-error::before {
        content: "* "
    }

    .clear-btn {
        background-color: Transparent;
        background-repeat: no-repeat;
        border: none;
        cursor: pointer;
        overflow: hidden;
        outline: none;
    }

    .fr-toolbar {
        border-top: 0px;
    }

    .nav-bg {
        background-color: ${colors.color1};
    }

    .nav-link {
        font-size: 0.85rem;
    }

    .navbar {
        padding: 0.25rem 1rem;
    }

    .input-group-text {
        min-width: 75px;
    }

    .img-fluid {
        max-height: 300px;
    }

    .recharts-wrapper {
        margin: auto;
    }

    input {
        padding: 1.5rem;
    }

    .progress {
        height: 2rem;
        font-size: 1rem;
    }

    .error {
        border-bottom: 2px solid ${colors.errorColor};
    }

    .masonry-card-list {
        margin-left: -0.25rem;
        margin-right: -0.25rem;
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
    }

    .lds-ellipsis div {
        position: absolute;
        top: 27px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: black;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .svg-icon {
        width: 24px;
        height: 24px;
    }
    .bg-parallax {
        height: 100%;
        width: 100%;
    }
    .br{
        border-top: 3px solid lightgrey;
    }
    .react-reveal{
        z-index: 1;
    }
`;
