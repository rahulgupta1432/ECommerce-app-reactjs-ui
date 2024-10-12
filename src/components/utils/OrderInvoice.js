import React from "react";

const OrderInvoice = ({ customerName, logoUrl, items, totalItemAmount, deliveryFee, totalAmount, invoiceAttachment }) => {
  return (
    <div style={{ fontFamily: "'Arial', sans-serif", lineHeight: '1.6', color: '#333', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
        
        {/* Logo Section */}
        <div style={{ textAlign: 'center' }}>
          <img src={logoUrl} alt="Company Logo" style={{ maxWidth: '150px', height: '150px' }} />
        </div>
        
        {/* Header */}
        <h1 style={{ color: '#4caf50', textAlign: 'center' }}>Order Invoice</h1>
        <p>Dear <span style={{ fontWeight: 'bold', color: '#4caf50' }}>{customerName}</span>,</p>
        
        <p>We're excited to let you know that your order with <strong>Mitra: Dukandar Ki App</strong> has been confirmed! Here are the details:</p>

        {/* Order Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Item</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Product Image</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Selling Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <img src={item.product_image} alt="Product Image" style={{ maxWidth: '100px', height: 'auto' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.sellingPrice}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.total_amount}</td>
              </tr>
            ))}

            {/* Total Row */}
            <tr>
              <td colSpan="4" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}><strong>Item Total</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalItemAmount}</td>
            </tr>
            {/* Delivery Fee Row */}
            <tr>
              <td colSpan="4" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}><strong>Delivery Fee</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{deliveryFee}</td>
            </tr>
            {/* Total Amount Row */}
            <tr>
              <td colSpan="4" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}><strong>Total Amount</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalAmount}</td>
            </tr>
          </tbody>
        </table>

        {/* Confirmation Message */}
        <p style={{ fontStyle: 'italic', marginTop: '15px' }}>
          Your order is confirmed and will be processed shortly. We'll notify you once it's dispatched.
        </p>

        {/* Thank You Message */}
        <p style={{ fontWeight: 'bold', color: '#4caf50' }}>Thank you for choosing Mitra: Dukandar Ki App!</p>

        {/* Attachment Section */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
          <p style={{ fontSize: '14px', color: '#555' }}>Attached to this page, you'll find the detailed invoice for your order.</p>
          <p>
            <a href={invoiceAttachment} download style={{ display: 'inline-block', padding: '10px', backgroundColor: '#4caf50', color: '#fff', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>
              Download Invoice
            </a>
          </p>
        </div>

        {/* Footer Message */}
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#777' }}>
          If you have any questions or concerns, feel free to contact our customer support. We're here to help!
        </p>
      </div>
    </div>
  );
};

export default OrderInvoice;
