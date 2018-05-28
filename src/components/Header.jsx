import React from 'react'

import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import styles from './Header.module.css'
import {Icon} from './Icon' 

import FlipMove from 'react-flip-move'

@observer
export default class Header extends React.Component{
    @observable searching = false
    @action toggleSearch = () =>{
      this.searching = !this.searching
    }

    componentDidUpdate(prevProps){
      if(prevProps.search !== this.props.search && !this.props.search && this.searching){
        this.toggleSearch()
      }
    }

  render(){
      const {backButton, title, step, onBackButtonClick} = this.props
      return(
        <div className = {styles.header}>


          <div className = {[styles.gradientOverflowBound, backButton? styles.wide : ''].join(' ')} />
            <div 
              className = {[styles.backButton, backButton? styles.visible : ''].join(' ')}
              onClick = {this.searching? this.toggleSearch : this.props.onBack}
            >
            <Icon 
              img = "chevleft" 
              size = "small" 
            />
            </div>
            
            <FlipMove
              className = {[styles.titleWrapper, backButton? styles.leftOffset:''].join(' ')}
              enterAnimation = {{
                from: {opacity: 0, transform: 'translateX(25%)'},
                to: {opacity: 1, transform: 'translateX(0)'},
              }}
              leaveAnimation = {{
                from: {opacity: 1, transform: 'translateX(0)'},
                to: {opacity: 0, transform: 'translateX(-25%)'},
              }}
            >
              <div 
                key = {this.searching && this.props.search? 'search' : title} 
                className = {styles.title}
              > 
                  {!this.searching && title}
                  {this.searching && this.props.search && 
                    <React.Fragment>
                    <Icon img = "search" size = "small" className = {styles.inputSearchIcon}/>
                    <input 
                      className = {styles.searchInput}
                      placeholder = {this.props.searchPlaceholder}
                    />
                    {/*
                    <div className = {styles.cancelSearch}>
                      <Icon img = "x" size = "small" />
                    </div>
                    */}
                    </React.Fragment>
                  } 
              </div>
              </FlipMove>

              <div className = {styles.right}>
              <FlipMove
                className = {styles.right}
              >
              {this.props.search && !this.searching && 
                <div 
                  className = {styles.search} 
                  onClick = {this.toggleSearch}
                > 
                  <Icon className = {styles.searchIcon} key = "search" img = "search" size = 'small' /> 
                </div>
              }
              {this.props.dotburger && 
                <div className = {styles.dotboigaButton}>
                  <Icon key = "dotboiga" img = "dotburger" size = 'small' className = {styles.dotboiga}/>
                </div>
              }
              </FlipMove>
              </div>
                      
        </div>
      )
    }
}

Header.defaultProps = {
  searchPlaceholder: 'Hello I need a placeholder.'
}