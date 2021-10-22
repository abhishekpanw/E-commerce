import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";

class SidebarContent extends Component {
  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end"></span>
                <span className="ms-1">{this.props.t("Dashboard")}</span>
              </Link>
            </li>


            <li>
              <Link to="/users" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end"></span>
                <span className="ms-1">{this.props.t("Users")}</span>
              </Link>
            </li>

            <li>
              <Link to="/categories" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end"></span>
                <span className="ms-1">{this.props.t("Categories")}</span>
              </Link>
            </li>

            <li>
              <Link to="/subCategories" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end"></span>
                <span className="ms-1">{this.props.t("Sub Categories")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ms-1">{this.props.t("Products")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/addProduct">{this.props.t("Add")}</Link>
                </li>
                <li>
                  <Link to="/products">{this.props.t("Listing")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title">{this.props.t("CMS")}</li>

            <li>
              <Link to="/cms" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end"></span>
                <span className="ms-1">{this.props.t("CMS")}</span>
              </Link>
            </li>

        
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
