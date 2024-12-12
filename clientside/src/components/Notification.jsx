import React, { useEffect, useState } from "react";
import "./notification.css"; // Add your styles in this CSS file
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notification", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 200) {
        setNotifications(res.data.message);
        setLoading(false);
      } else {
        alert("Failed to fetch notifications");
      }
    } catch (error) {
      alert("Error: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
console.log(notifications);

  return (
    <div className="notification-container">
      <h1 className="notification-header">Purchase Notifications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        notifications.map((notification, index) => (
          <div key={index} className="notification-card">
            <div className="card-item">
              <strong>User Name:</strong>
              <span>{notification.buyername
              }</span>
            </div>
            <div className="card-item">
              <strong>Product Name:</strong>
              <span>{notification.productName}</span>
            </div>
            <div className="card-item">
              <strong>Description:</strong>
              <span>{notification.description}</span>
            </div>
            <div className="card-item">
              <strong>Offer Price:</strong>
              <span>${notification.
price
}</span>
            </div>
            <div className="card-item button-container">
              <button className="confirm-button">Confirm</button>
            </div>
          </div>
        ))
      )}
    </div>
   
  );
};

export default Notification;
