import React from 'react';

export default class Navbar extends React.Component {
      render(){
        return(
          <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <a className="navbar-brand" href={this.props.href}>{this.props.title}</a>
                <div className="collapse navbar-collapse" id="navbarColor01">
                  <ul className="navbar-nav me-auto">
                    <li class="nav-item">
                      <a class="nav-link" href={this.props.hreftext}>{this.props.text}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href={this.props.hreftext2}>{this.props.text2}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href={this.props.hreftext3}>{this.props.text3}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href={this.props.hreftext4}>{this.props.text4}</a>
                    </li>
                  </ul>
                  <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">{this.props.Seach}</button>
                  </form>
                </div>
              </div>
            </nav>
          <div class="body-nav">
              {this.props.children}
            </div></>
            )
        } 
    }
    