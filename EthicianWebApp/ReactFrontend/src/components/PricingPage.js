// components/PricingPage.js

import React from 'react';
import './PricingPage.css'; // Import CSS file for styling

function PricingPage() {
  return (
    <div className="pricing-page">
      <div className="glassmorphism-container">
        <h2>Pricing</h2>
        <table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Price</th>
              <th>Number of AI Agents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lite Version</td>
              <td>Free</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Specialized Version</td>
              <td>$20/month</td>
              <td>15 (Engineering, Student, Lawyer Variant)</td>
            </tr>
            <tr>
              <td>Customized Version</td>
              <td>$50/month</td>
              <td>Customizable</td>
            </tr>
          </tbody>
        </table>
        <div className="stripe-link">
          <a href="/stripe-payment">Upgrade Now (Stripe Payment)</a>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;