import TopNavbar from '../../Components/layouts/Header/TopNavbar'
import Layout from '../../Layouts/PayLayout/Layout';

import Syriatel from '../../assets/logo/Ellipse 11.png';
import MTN from '../../assets/logo/Ellipse 13.png';
import Watch from '../../assets/products_tech/image 32.png'

import { VscRefresh } from "react-icons/vsc";
import SecondButton from '../../Components/ui/SecondButton';
import Button from '../../Components/ui/Button';


const Payment = () => {

    const cartItems = [
        {
            id: 1,
            title: "Smart watches",
            subtitle: "Special Backed Bread made in the oven",
            quantity: 2,
            price: "600 AED",
            image: Watch
        },
        {
            id: 2,
            title: "Smart watches",
            subtitle: "Special Backed Bread made in the oven",
            quantity: 2,
            price: "600 AED",
            image: Watch
        },
        {
            id: 3,
            title: "Smart watches",
            subtitle: "Special Backed Bread made in the oven",
            quantity: 2,
            price: "600 AED",
            image: Watch
        }
    ];


    return (
        <>
            <TopNavbar />
            <Layout
                leftContent={
                    <div className="text-start d-flex flex-column gap-4 text-light p-5">
                        <div className="title-payment">
                            <p className="">Payment Method</p>
                            <small >Pick your payment method </small>
                        </div>
                        <div>
                            <form className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="cash">Cash</label>
                                    <input type="radio" name="payment" id="cash" />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="syriatel"> <img src={Syriatel} width={50} alt="syriatel" /> Syriatel</label>
                                    <input type="radio" name="payment" id="syriatel" />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="mtn"> <img src={MTN} width={50} alt="mtn" /> MTN </label>
                                    <input type="radio" name="payment" id="mtn" />
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">Discount Code</label>
                                    <div className="d-flex justify-content-between gap-4">
                                        <input type="number" id="" className="w-75 p-2 rounded-2 border-0 form-control" />
                                        <SecondButton className="w-25 p-2 rounded-2 border-0" value={<><VscRefresh />Check</>}> </SecondButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                rightContent={
                    <>
                        <div className="d-flex flex-column gap-4 w-100 py-5 px-2 ">
                            {
                                cartItems.map((item) => (
                                    <div className="product-card-item d-flex justify-content-between align-items-center" key={item.id}>
                                        <div className="product-info d-flex align-items-center">
                                            <div>
                                                <img src={item.image} width={50} alt={item.title} />
                                            </div>
                                            <div className="fs-6 lh-1">
                                                <p className="fw-bold">{item.title}</p>
                                                <small className="text-secondary">{item.subtitle}</small>
                                            </div>
                                        </div>
                                        <div className="product-priec-quan d-flex align-items-center gap-2">
                                            <p className="border rounded-2 px-2">{item.quantity}</p>
                                            <p>{item.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>Total</p>
                                <p>110.000</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>Discount</p>
                                <p>0</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>Tax</p>
                                <p>4.000</p>
                            </div>
                            <div className="border-bottom" />
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>Net Total</p>
                                <p>114.000</p>
                            </div>
                            <Button value={"Confirm Payment"} />
                        </div>
                    </>
                }
            />

        </>
    )
}

export default Payment
