import { Link } from "react-router-dom"

const Path = (props) => {

    return (

        <>
            <section className="section-pagetop bg pt-3">
                <div className=" mx-auto sm:px-4 ">
                    <nav>
                        <ol className="flex flex-wrap list-reset pt-3 pb-3 py-4 px-4 mb-4 bg-gray-200 rounded ">
                            <li className="inline-block px-1 py-2 "><Link to="/" className=" text-text-color">Trang chủ</Link></li>
                            <li className="inline-block px-1 py-2 "><Link to="/allproduct" className=" text-text-color ">/ Sản phẩm</Link></li>
                            {props.data == "" ? " " : <li className="inline-block px-1 py-2 text-text-color active" aria-current="page">/ {props.data}</li>}
                        </ol>
                    </nav>
                </div>
            </section>


        </>
    )

}

export default Path