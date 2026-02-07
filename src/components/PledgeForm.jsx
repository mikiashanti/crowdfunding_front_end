import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./PledgeForm.css";

export default function PledgeForm() {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [fundraiser, setFundraiser] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !fundraiser) {
      return alert("Fill required fields");
    }

    try {
      const payload = {
        amount: Number(amount),
        comment,
        anonymous,
        fundraiser: Number(fundraiser),
      };

      const url = `${import.meta.env.VITE_API_URL}/pledges/`;
      const headers = { "Content-Type": "application/json" };
      if (auth?.token) headers["Authorization"] = `Token ${auth.token}`;

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        navigate(`/fundraisers/${fundraiser}`);
      } else {
        const errBody = await res.json().catch(() => null);
        const msg = errBody?.detail ?? errBody?.message ?? "Failed to create pledge";
        alert(msg);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the pledge");
    }
  }

  return (
    <form className="pledge-form" onSubmit={handleSubmit}>
      <h2>Make a Pledge</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (USD)"
        required
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment"
      />

      <input
        type="number"
        value={fundraiser}
        onChange={(e) => setFundraiser(e.target.value)}
        placeholder="Fundraiser ID"
        required
      />

      <label style={{ display: "block", marginBottom: "15px", fontSize: "14px", color: "#555" }}>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          style={{ marginRight: "8px" }}
        />
        Donate anonymously
      </label>

      <button type="submit">Create Pledge</button>
    </form>
  );
}
