import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Layout, Alert, Tabs } from 'antd';
import AddForm from "./commponents/AddForm";
import DeleteForm from "./commponents/DeleteForm";
import UpdateForm from "./commponents/UpdateForm";
import {Link} from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

class Backstage extends React.Component {
    state = {
        giftList: [],
        alertValue: "hide"
    }

    postData = (values, url) => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', url, true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify(values));
        return httpRequest;
    }

    onAddGift = (values) => {
        const httpRequest = this.postData(values, 'https://qc72tz.fn.thelarkcloud.com/insertToGiftsTable');
        const thisPer = this;

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                thisPer.setState({
                    alertValue: "success"
                });
                thisPer.fetchGiftList();
            } else {
                thisPer.setState({
                    alertValue: "wrong"
                });
            }

            setTimeout(() => {
                thisPer.setState({
                    alertValue: "hide"
                });
                console.log("alert unload");
            }, 2000);
        };
    }

    onDeleteGift = (values) => {
        const httpRequest = this.postData(values, 'https://qc72tz.fn.thelarkcloud.com/deleteGift');
        const thisPer = this;

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                thisPer.setState({
                    alertValue: "success"
                });
                thisPer.fetchGiftList();
            } else {
                thisPer.setState({
                    alertValue: "wrong"
                });
            }

            setTimeout(() => {
                thisPer.setState({
                    alertValue: "hide"
                });
                console.log("alert unload");
            }, 2000);
        };
    }

    onUpdateGift = () => {

    }

    fetchGiftList = () => {
        fetch("https://qc72tz.fn.thelarkcloud.com/getGiftList").then(
            res => {
                return res.json()
            }
        ).then(
            data => {
                console.log(data);
                this.setState({
                    giftList: data.giftList,
                });
            }
        ).catch((e) => {
            console.log(e);
        });
    }

    componentDidMount() {
        this.fetchGiftList();
    }

    render() {
        const { giftList } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <Link to='/'>
                            <div className='go-back'>
                                Go Back
                            </div>
                        </Link>
                        <h1 className="backstage-title">
                            ??????????????????????????????
                        </h1>
                    </Header>
                    <Content className="site-layout-background content-container">
                        <Tabs className="tab-container" defaultActiveKey="1">
                            <TabPane classname="tab-item" value="add" tab="??????" key="1">
                                <div className="form-wrap">
                                    <div className="alert-container">
                                        { (this.state.alertValue === "success") && <Alert className="alert-item" message="????????????" type="success" />}
                                        { (this.state.alertValue === "wrong") && <Alert className="alert-item" message="??????????????????" type="error" />}
                                    </div>
                                    <AddForm onSubmit={this.onAddGift} />
                                </div>
                            </TabPane>
                            <TabPane classname="tab-item" value="delete" tab="??????" key="2">
                                <div className="form-container">
                                    <div className="alert-container">
                                        { (this.state.alertValue === "success") && <Alert className="alert-item" message="????????????" type="success" />}
                                        { (this.state.alertValue === "wrong") && <Alert className="alert-item" message="????????????" type="error" />}
                                        { (this.state.alertValue === "null") && <Alert className="alert-item" message="??????????????????" type="error" />}
                                    </div>
                                    <DeleteForm onSubmit={this.onDeleteGift} giftList={giftList} />
                                </div>
                            </TabPane>
                            <TabPane classname="tab-item" value="update" tab="??????" key="3">
                                <div className="form-container">
                                    <UpdateForm onSubmit={this.onUpdateGift} giftList={giftList} />
                                </div>
                            </TabPane>
                        </Tabs>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Author: Breeze-P Github:
                        <a href="https://github.com/Breeze-P" style={{ whiteSpace: "pre" }}>  https://github.com/Breeze-P</a>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Backstage;