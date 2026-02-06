import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

export default function FundraiserForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState(""); // image URL
  const navigate = useNavigate();
  const { auth } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description || !goal) {
      return alert("Fill required fields");
    }

    try {
      const payload = {
        title,
        description,
        goal: Number(goal),
        image, // URL string
        is_open: true,
      };

      const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
      const headers = {
        "Content-Type": "application/json",
      };

      if (auth?.token) {
        headers["Authorization"] = `Token ${auth.token}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        navigate(`/fundraisers/${data.id}`);
      } else {
        const errBody = await res.json().catch(() => null);
        const msg =
          errBody?.detail ??
          errBody?.message ??
          "Failed to create fundraiser";
        alert(msg);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the fundraiser");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Goal (USD)"
        required
      />

      {/* IMAGE URL INPUT */}
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />

      {/* PREVIEW */}
      {image && (
        <img
          src={image}
          alt="preview"
          width="120"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      <button type="submit">Create Fundraiser</button>
    </form>
  );
}
