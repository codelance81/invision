import React from 'react';
import Moment from 'react-moment';
import { truncate } from 'lodash';
import { isEqual } from 'ip';

class NewsRow extends React.Component { 
  constructor() {
    super();

    this.state = {
      truncate: true,
    }
  }
  render() {
    const isTruncate = this.state.truncate;
    const { data } = this.props;  
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="news-card">
            <small>
              <Moment format = "YYYY/MM/DD">
                {data.datetime}
              </Moment>
            </small>
            <h3 style={{marginTop:1}}>{ data.headline }</h3>
            { data.summary.length > 120 ? (
              <React.Fragment>
                { isTruncate ? <p>{truncate(data.summary, { length: 120 })}</p> : <p>{data.summary}</p> }
                <button className="btn btn-sm btn-info" onClick={ () => { this.setState({ truncate: !isTruncate })} }>
                  { isTruncate ? 'View more' : 'View less' }
                </button>
              </React.Fragment>
              ) : <p>{data.summary}</p>
            }
          </div>
        </div>
      </div>
    )
  }
}
export default NewsRow


// _.truncate('hi-diddly-ho there, neighborino', {
//     'length': 24,
//     'separator': ' '
//   });