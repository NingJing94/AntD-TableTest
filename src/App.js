import React, { Component } from 'react';
import { Upload, Button, Icon, message, Table, Divider } from 'antd';
import moment from 'moment';
import './App.css';

//mock DB data
const dataSourcePool = [];
for(let  i = 0; i < 30; i++) {
  let dailyPrefix = Math.random() >= 0.5 ? '' : '-',
      monthlyPrefix = Math.random() >= 0.5 ? '' : '-',
      annuallyPrefix = Math.random() >= 0.5 ? '' : '-',
      totalPrefix = Math.random() >= 0.5 ? '' : '-';
  dataSourcePool.push(
    {
      key: 'key ' + (i + 1),
      groupName: 'Group Name '  + (i + 1),
      groupType: 'Group Type ' + (i + 1),
      dailyReturn: dailyPrefix + Math.floor(Math.random() * Math.floor(20)) + '%',
      monthlyReturn: monthlyPrefix + Math.floor(Math.random() * Math.floor(20)) + '%',
      annuallyReturn: annuallyPrefix + Math.floor(Math.random() * Math.floor(20)) + '%',
      totalReturn: totalPrefix + Math.floor(Math.random() * Math.floor(20)) + '% (' + (moment().format('YYYYMMDD')) + ')',
      referenceRefactor: '电力及公共事业',
    }
  );
}

const simulationGroupColumns = [
  {
    title: '组合名称',
    dataIndex: 'groupName',
    key: 'groupName',
    sorter: true,
  }, {
    title: '组合类型',
    dataIndex: 'groupType',
    key: 'groupType',
    sorter: true,
  }, {
    title: '日收益',
    dataIndex: 'dailyReturn',
    key: 'dailyReturn',
    sorter: true,
    render: (text, record) => {
      var textStyle = text.indexOf('-') === -1 ? {color: 'red'} : {color: 'green'};
      return ( <span style={ textStyle }>{text}</span> );
    },
  }, {
    title: '月收益',
    dataIndex: 'monthlyReturn',
    key: 'monthlyReturn',
    sorter: true,
    render: (text, record) => {
      var textStyle = text.indexOf('-') === -1 ? {color: 'red'} : {color: 'green'};
      return ( <span style={ textStyle }>{text}</span> );
    },
  }, {
    title: '年收益',
    dataIndex: 'annuallyReturn',
    key: 'annuallyReturn',
    sorter: true,
    render: (text, record) => {
      var textStyle = text.indexOf('-') === -1 ? {color: 'red'} : {color: 'green'};
      return ( <span style={ textStyle }>{text}</span> );
    },
  }, {
    title: '累计收益',
    dataIndex: 'totalReturn',
    key: 'totalReturn',
    sorter: true,
    render: (text, record) => {
      var textStyle = text.indexOf('-') === -1 ? {color: 'red'} : {color: 'green'};
      return ( <span style={ textStyle }>{text}</span> );
    },
  }, {
    title: '参考指标',
    dataIndex: 'referenceRefactor',
    key: 'referenceRefactor',
    sorter: true,
  }];


class App extends Component {
  state = {
    data: [],
    currentPage: 1,
    defaultPageSize: 5,
    pageSize: 5,
    loading: false,
  };

  handleTableChange = (pagination, filters, sorter) => {
    var oFetchedDataSource = [];
    this.setState({
      loading: true
    });
    oFetchedDataSource = this.fetch({
      results: this.state.pageSize * this.state.currentPage,
      page: 1,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
    this.setState({
      loading: false,
      data: oFetchedDataSource,
    });
  }

  fetch = (params = {}) => {
    // console.log('params:', params);
    // this.setState({ loading: true });
    // reqwest({
    //   url: 'https://randomuser.me/api',
    //   method: 'get',
    //   data: {
    //     results: 10,
    //     ...params,
    //   },
    //   type: 'json',
    // }).then((data) => {
    //   this.setState({
    //     loading: false,
    //     data: data.results,
    //   });
    // });
    var fromIndex = params.results && params.page ? (params.results * params.page) : 0,
        itemCount = params.results || this.state.defaultPageSize,
        fetchedData = [],
        oSortedDataSource = [],
        fnCompare;
    
    if(params.sortField && params.sortOrder) {
      fnCompare = function(item1, item2) {
                    let num1 = parseFloat(item1[params.sortField].replace('%', '')),
                        num2 = parseFloat(item2[params.sortField].replace('%', ''));
                    if(num1 > num2) {
                      return params.sortOrder === "descend" ? -1 : 1;
                    } else if(num1 < num2) {
                      return params.sortOrder === "descend" ? 1 : -1;
                    } else {
                      return 0;
                    }
                  };
      oSortedDataSource = dataSourcePool.sort(fnCompare);
      fetchedData = oSortedDataSource.slice(0, itemCount);
    } else {
      for(let i = 0; i < itemCount; i++) {
        if(fromIndex > dataSourcePool.length - 1) break;
        fetchedData.push(dataSourcePool[fromIndex]);
        fromIndex++;
      }
    }

    return fetchedData;
  }

  onShowMore = () => {
    var currentPage = this.state.currentPage + 1,
        params = {},
        oFetchedDataSource;
    this.setState({
      loading: true
    });
    params = {
      page: this.state.currentPage,
      results: this.state.defaultPageSize,
    };
    oFetchedDataSource = this.fetch(params);
    this.setState({
      currentPage: currentPage,
      loading: false,
      data: this.state.data.concat(oFetchedDataSource),
    });
  }

  componentDidMount() {
    var initialDataSource = this.fetch();
    this.setState({
      data: initialDataSource,
    });
  }

  render() {
    return (
      <div>
        <Table 
          title={() => '我的模拟组合'}
          dataSource={this.state.data}
          columns={simulationGroupColumns}
          footer={() => <div onClick={this.onShowMore.bind(this)} style={ {textAlign: 'center'} }>显示更多</div>}
          pagination={false}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

 export default App;
