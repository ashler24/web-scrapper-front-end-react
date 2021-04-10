import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Container, Form, FormGroup, Label, Nav, NavItem, NavLink, Pagination, PaginationItem, PaginationLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { BiError } from 'react-icons/bi';
import { BiSearchAlt } from 'react-icons/bi';
import api from '../../api.js';
import useDebounce from '../../shared/hooks/useDebounce.js';
import ProducList from './productList.js';
import './home.css';




const Home = () => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [productTitleList, setProductTitleList] = useState([]);
    const [amazonProductList, setAmazonProductList] = useState([]);
    const [flipkartProductList, setFlipkartProductList] = useState([]);
    const [snapdealProductList, setSnapdealProductList] = useState([]);
    const [toggleProductTable, setToggleProductTable] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {

        if (debouncedSearchTerm) {

            // Fire off our API call
            async function getProductTitleList() {
                try {
                    let response = await api.get('/getTitlesOnType?title=' + searchTerm);
                    setProductTitleList([...response.data.productData.map(item => item.title.toLowerCase())]);
                }
                catch (error) {
                    setProductTitleList([]);
                }
            }

            getProductTitleList();

        }
        else {
            setProductTitleList([]);
        }
        // eslint-disable-next-line
    }, [debouncedSearchTerm])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        if (data.productName) {
            async function getProductDataList() {
                let response = await api.get('/?title=' + data.productName);
                console.log(response.data.productData);
                setAmazonProductList([...response.data.productData.filter(item => item.source === 'amazon')]);
                setFlipkartProductList([...response.data.productData.filter(item => item.source === 'flipkart')]);
                setSnapdealProductList([...response.data.productData.filter(item => item.source === 'snapdeal')]);
                setToggleProductTable(true);
            }

            getProductDataList();
        }
    }

    return (
        <>
            <main id="homeLayout">
                <section id="searchBar">
                    <div className="search-bar-wrapper container-sm">
                        <Form className="product-search-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <FormGroup>
                                <Label for="productName">Search Product</Label>
                                <div className="input-box-wrapper">
                                    <div className="search-icon-wrapper">
                                        <span className="search-icon"><BiSearchAlt /></span>
                                    </div>
                                    <input
                                        {...register("productName", { required: true })}
                                        className="form-control product-name-search"
                                        placeholder="search products..."
                                        list={searchTerm ? "data" : ""}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div id="suggest_container">
                                    <datalist id="data">
                                        {productTitleList.map((title, key) =>
                                            <option key={key} value={title} />
                                        )}
                                    </datalist>
                                </div>
                                {errors.productName && <span className="error ml-1"><BiError />{"This field is required."}</span>}
                            </FormGroup>
                            <Container>
                                <Row>
                                    <Col>
                                        <button type="submit" className="btn btn-primary btn-md btn-block">Submit</button>
                                    </Col>
                                    <Col>
                                        <button type="reset" className="btn btn-warning btn-md btn-block">Reset</button>
                                    </Col>
                                </Row>
                                <Row></Row>
                            </Container>
                        </Form>
                    </div>
                </section>
                <section id="productData" className={toggleProductTable ? "" : "hide"}>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                Amazon
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Flipkart
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                Snapdeal
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <div className="amazon-product-container">
                                <ProducList productList={amazonProductList} />
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <div className="snapdeal-product-container">
                                <ProducList productList={flipkartProductList} />
                            </div>
                        </TabPane>
                        <TabPane tabId="3">
                            <div className="snapdeal-product-container">
                                <ProducList productList={snapdealProductList} />
                            </div>
                        </TabPane>
                    </TabContent>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem>
                            <PaginationLink first href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink previous href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                4
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                5
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink last href="#" />
                        </PaginationItem>
                    </Pagination>
                </section>
            </main>
        </>
    );
}

export default Home;