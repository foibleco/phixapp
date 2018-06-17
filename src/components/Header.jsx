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

    focusBlur = () => {
      if(this.searching && this.props.search) this.searchInput.focus()
      // else this.searchInput.blur()
    }

    componentDidUpdate(prevProps){
      if(prevProps.search !== this.props.search && !this.props.search && this.searching){
        this.toggleSearch()
      }
    }

  render(){
      const {backButton, title, step} = this.props
      return(
        <div className = {[styles.header, this.props.hide? styles.hide : '', styles[this.props.theme]].join(' ')}>


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
                from: {opacity: 0, transform: 'translateX(35%)'},
                to: {opacity: 1, transform: 'translateX(0)'},
              }}
              leaveAnimation = {{
                from: {opacity: 1, transform: 'translateX(0)'},
                to: {opacity: 0, transform: 'translateX(-65%)'},
              }}
              onFinishAll = {this.focusBlur}
            >
              <div 
                key = {this.searching && this.props.search? 'search' : title} 
                className = {styles.title}
              > 
                  {!this.searching && title}
                  {this.searching && this.props.search && 
                    <React.Fragment>
                    <Icon img = "search" size = "tiny" className = {styles.inputSearchIcon}/>
                    <input 
                      ref = {(input)=>{this.searchInput = input}}
                      className = {styles.searchInput}
                      placeholder = {this.props.searchPlaceholder}
                      onChange = {this.props.onSearch? this.props.onSearch : (e)=>{console.log('search for ', e.target.value)}}
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
  searchPlaceholder: 'Hello I need a placeholder.',
  theme: 'default' // discreet
}