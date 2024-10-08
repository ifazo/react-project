import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";

const CheckCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
      stroke="#16a34a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4L12 14.01L9 11.01"
      stroke="#16a34a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5L19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V12H15V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "black",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "8px",
        marginRight: "8px",
        transition: "all 0.3s ease",
        outline: "none",
      }}
    >
      {children}
    </button>
  );
};

const SuccessPage = () => {
  const [sessionDetails, setSessionDetails] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails(sessionId);
    }
  }, [sessionId]);

  const fetchSessionDetails = async (sessionId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment?id=${sessionId}`
      );
      const data = await response.json();
      setSessionDetails(data);
    } catch (error) {
      console.error("Error fetching session details:", error);
    }
  };

  if (!sessionDetails) {
    return <Spinner />;
  }

  const lineItems = Array.isArray(sessionDetails?.line_items?.data)
    ? sessionDetails.line_items.data
    : [];

  const handleViewOrderDetails = () => {
    console.log("Navigating to order details page");
  };

  const handleReturnHome = () => {
    window.location.href = '/'
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f7fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "32px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div
              style={{
                margin: "0 auto 16px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#f0fff4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon />
            </div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#16a34a",
                marginBottom: "8px",
              }}
            >
              Payment Successful!
            </h1>
            <p style={{ color: "#4a5568", marginBottom: "24px" }}>
              Thank you for your purchase. Your order has been processed
              successfully.
            </p>
          </div>
          <div style={{ marginBottom: "24px" }}>
            {lineItems.length > 0 ? (
              lineItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={item.image}
                    alt="img"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "16px",
                    }}
                  />
                  <div>
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {item.description}
                    </h2>
                    <p style={{ color: "#4a5568", marginBottom: "4px" }}>
                      Price: ${item.amount_total / 100} {item.currency}
                    </p>
                    <p style={{ color: "#4a5568" }}>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}

            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>Subtotal:</span>
                <span>${sessionDetails.amount_total / 100} </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "16px",
                }}
              >
                <span>Total:</span>
                <span>
                  ${sessionDetails.amount_total / 100}{" "}
                  {sessionDetails.currency}
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Customer Name:</span>
              <span>{sessionDetails.customer_details.name}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Date:</span>
              <span>
                {new Date(sessionDetails.created * 1000).toLocaleString()}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={handleViewOrderDetails}>
              View Order Details
              <ArrowRightIcon style={{ marginLeft: "4px", stroke: "white" }} />
            </Button>
            <Button onClick={handleReturnHome}>
              <HomeIcon style={{ marginRight: "4px", stroke: "white" }} />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
