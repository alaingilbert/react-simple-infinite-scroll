# react simple infinite scroll

```jsx
import { InfiniteScroll } from 'react-simple-infinite-scroll';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      scrollDisabled: false,
    };
  }

  loadMoreItems() {
    return new Promise((resolve, reject) => {
      this.setState({scrollDisabled: true}, () => {
        setTimeout(() => {
          const fromIndex = this.state.list.length;
          let newData = [];
          for (let i = fromIdx; i < fromIdx+10; i++)
            newData.push({name: `Item ${i}`});
          const newList = this.state.list.concat(newData);
          this.setState({
            list: newList,
            scrollDisabled: false,
          }, resolve);
        }, 250);
      });
    });
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
        <table>
          <InfiniteScroll callback={this.loadMoreItems.bind(this)} // must return a promise
                          scrollDisabled={this.state.scrollDisabled}
                          containerType="tbody">
            {this.state.list.map((value, index) => {
              return <tr key={index}><td>{value.name}</td></tr>;
            })}
          </InfiniteScroll>
        </table>
      </div>
    );
  }
}
```

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| callback | Boolean | ✓ | Expression to evaluate (usually a function call) when the bottom of the element approaches the bottom of the browser window. |
| scrollDisabled | Boolean |  | A boolean expression that, when **true**, indicates that the infininite scroll expression should not be evaluated even if all other conditions are met. This is usually used to throttle or pause the infinite scroll, for example when data is loading via Ajax. If a scroll event triggers the directive but this attribute prevents the expression evaluation, the event will be handled instead immediately after this attribute again evaluates to **false**. |
| containerType | String |  | Html tag type by which `<InfiniteScroll>` will be replaced. Default to `div`. |