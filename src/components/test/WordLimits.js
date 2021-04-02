import React, {Component} from 'react'
import WordLimit from 'react-word-limit'

export default class WordLimits extends Component{
    render(){
        return(
            <div>
                <WordLimit limit={68}>{this.props.children}</WordLimit>
            </div>
        )
    }
}
