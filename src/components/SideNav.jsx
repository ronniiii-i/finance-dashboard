import { Link } from "react-router-dom";

import { VscDashboard } from "react-icons/vsc";
import { CiDollar, CiSearch } from "react-icons/ci";
import { PiChartLineThin } from "react-icons/pi";

import "../styles/sidenav.scss";

function SideNav() {
  return (
    <section id="sidenav" className="flex column">
      {/* <div className="menu flex justifyLeft align-center">
        <>Collapse</>
        <svg
          viewBox="0 0 1024 1024"
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M914.368 673.664h-519.68c-25.152 0-45.568-22.016-45.568-48.896 0-26.88 20.416-48.896 45.568-48.896h519.68c25.216 0 45.632 22.016 45.632 48.896 0 26.88-20.48 48.896-45.632 48.896z m0-228.096h-519.68c-25.152 0-45.568-21.952-45.568-48.896 0-26.88 20.416-48.896 45.568-48.896h519.68c25.216 0 45.632 22.016 45.632 48.896 0 26.88-20.48 48.896-45.632 48.896z m-3.264-219.904H115.328c-26.88 0-50.56-20.352-51.328-47.168A48.896 48.896 0 0 1 112.896 128h795.776c26.88 0 50.56 20.416 51.328 47.168a48.896 48.896 0 0 1-48.896 50.56z m-619.776 447.232V348.672L64 510.784l227.328 162.112c0 0.768 0 0.768 0 0z m-178.432 122.944h795.776c26.88 0 50.56 20.48 51.328 47.232a48.896 48.896 0 0 1-48.896 50.496H115.328c-26.88 0-50.56-20.416-51.328-47.232a48.896 48.896 0 0 1 48.896-50.496z" />
        </svg>
      </div> */}
      <div className="user flex justify-between align-center">
        <div className="user-info flex align-center">
          <div className="avatar">
            <img src="https://picsum.photos/200" alt="Avatar" />
          </div>
          <div className="details">
            <h6>John Doe</h6>
            <small>john.doe@example.com</small>
          </div>
        </div>
        <div>
          <a>
            <svg
              width="16"
              height="4"
              viewBox="0 0 16 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99999 3.16664C8.46023 3.16664 8.83333 2.71893 8.83333 2.16664C8.83333 1.61436 8.46023 1.16664 7.99999 1.16664C7.53976 1.16664 7.16666 1.61436 7.16666 2.16664C7.16666 2.71893 7.53976 3.16664 7.99999 3.16664Z"
                stroke="#4B5563"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.8333 3.16664C14.2936 3.16664 14.6667 2.71893 14.6667 2.16664C14.6667 1.61436 14.2936 1.16664 13.8333 1.16664C13.3731 1.16664 13 1.61436 13 2.16664C13 2.71893 13.3731 3.16664 13.8333 3.16664Z"
                stroke="#4B5563"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.16666 3.16664C2.6269 3.16664 2.99999 2.71893 2.99999 2.16664C2.99999 1.61436 2.6269 1.16664 2.16666 1.16664C1.70642 1.16664 1.33333 1.61436 1.33333 2.16664C1.33333 2.71893 1.70642 3.16664 2.16666 3.16664Z"
                stroke="#4B5563"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div className="menu">
            <Link to="/account">Account</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>
      <div className="search flex align-center">
        <CiSearch />
        <input type="search" placeholder="Search" />
      </div>
      <nav>
        <ul>
          <li>
            <Link className="flex align-center" to="/">
              <VscDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="flex align-center" to="/transactions">
              <CiDollar />
              Transactions
            </Link>
          </li>
          <li>
            <Link className="flex align-center" to="/reports">
              <PiChartLineThin />
              Reports
            </Link>
          </li>
        </ul>
      </nav>
      {/* <button className="button-primary">Toggle Theme</button> */}
    </section>
  );
}

export default SideNav;
