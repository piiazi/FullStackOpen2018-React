import React, { Component } from 'react';

import classes from './Layout.css';
import Button from '../../components/Button/Button';
import Statistics from '../../components/Statistics/Statistics';


class Layout extends Component {

  state = {
    opinions: [
      { name: 'hyvä', count: 0, value: 1 },
      { name: 'neutraali', count: 0, value: 0 },
      { name: 'huono', count: 0, value: -1 }
    ],
    average: 0,
    positive: 0,
    opinionAvailable: false
  }

  clickHandler = (index) => {

    let opinionsCopy = this.state.opinions;
    opinionsCopy[index].count += 1;

    let sum = 0;
    let totalCount = 0;
    let avg = 0;
    let pos = 0;

    opinionsCopy.map( oneItem => {
      sum = sum + oneItem.count * oneItem.value;
      totalCount = totalCount + oneItem.count;

      if( oneItem.value > 0 ){
        pos = pos + oneItem.count;
      }
      return <span></span>;
    })

    avg = sum/totalCount;
    avg = avg.toFixed(1);

    pos = pos/totalCount * 100;
    pos = pos.toFixed(1);

    this.setState({ opinions: opinionsCopy });
    this.setState({ average: avg });
    this.setState({ positive: pos  })
    this.setState({ opinionAvailable: true });
  }

  render() {

    return (
      <div className="Layout">
        <h2 className="LayoutTitle">Anna palautetta</h2>

        { this.state.opinions.map( (oneOpinion, index) => {
            return <Button key={ oneOpinion + index } buttonText={ oneOpinion.name } clicked={ () => this.clickHandler(index) } />
        })}

        <h2 className="LayoutTitle">Statistiikka</h2>

       { this.state.opinionAvailable ?
        <Statistics
           allOpinions={ this.state.opinions }
           average={ this.state.average }
           positiveValues={ this.state.positive }
        />
        :
        <p>Ei yhtään palautetta annettu.</p>
        }
      </div>
    );

  }

}

export default Layout;
