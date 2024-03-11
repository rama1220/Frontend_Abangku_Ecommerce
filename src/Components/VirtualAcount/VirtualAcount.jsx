import { useState, useEffect } from "react";
import InformationSect from "../InformationSect/InformationSect";
import formatRupiah from "../../helper/Rupiah";
import { useAuth } from "../../Context/AuthContext";

export default function VirtualAccount() {
  const [Datainvoice, setInvoice] = useState("");
  const [Datatotal, setTotal] = useState("");
  const [Datashipment, setShipment] = useState("");
  const [DatapayStatus, setPayStatus] = useState("");
  const [location, setLocation] = useState("");

  const [url, setUrl] = useState("");
  const { or } = useAuth();
  const a = Number(Datatotal);
  const b = Number(Datashipment);
  const Total = a + b;
  useEffect(() => {
    const invoice = localStorage.getItem("invoice");
    const total = localStorage.getItem("total");
    const payStatus = localStorage.getItem("payment");
    const shipment = localStorage.getItem("shipment");
    const paymentUrl = localStorage.getItem("paymentUrl");
    const location = localStorage.getItem("address");
    setUrl(paymentUrl);
    setInvoice(invoice);
    setTotal(total);
    setPayStatus(payStatus);
    setShipment(shipment);
    setLocation(location)
  }, [or]);

  const handlePayment = async () => {
    try {
      window.location.href = `${url}`;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-VA">
        <div className="container-bank">
          <table className="table-invoice">
            <thead>
              <tr>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{location}</td>
              </tr>
            </tbody>
          </table>

          <table className="table-invoice">
            <thead>
              <tr>
                <th>Invoice</th>
                <th></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Datainvoice}</td>
                <td className="product-name">
                  Total: IDR {formatRupiah(Datatotal)}
                  <p>Status: {DatapayStatus}</p>
                  <p>Shipment: IDR {Datashipment}</p>
                  <p>Total Payment: IDR {formatRupiah(Total)}</p>
                </td>
                <td>
                  <button className="btn-payment" onClick={handlePayment}>
                    PAYMENT
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <InformationSect />
    </>
  );
}
