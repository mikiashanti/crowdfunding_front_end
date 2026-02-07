import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import useAuth from "../hooks/use-auth.js";

function FundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: true,
  });

  // Initialize formData when fundraiser loads
  if (fundraiser && !formData.title) {
    setFormData({
      title: fundraiser.title,
      description: fundraiser.description,
      goal: fundraiser.goal,
      image: fundraiser.image || "",
      is_open: fundraiser.is_open,
    });
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  // DELETE handler
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this fundraiser?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/fundraisers/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(auth?.token && { Authorization: `Token ${auth.token}` }),
        },
      });

      if (res.ok) {
        alert("Fundraiser deleted successfully!");
        navigate("/"); // redirect to homepage or fundraiser list
      } else {
        const errBody = await res.json().catch(() => null);
        const msg = errBody?.detail ?? errBody?.message ?? "Failed to delete fundraiser";
        alert(msg);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the fundraiser");
    }
  }

  // EDIT handler (PUT request)
  async function handleEditSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/fundraisers/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(auth?.token && { Authorization: `Token ${auth.token}` }),
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          goal: Number(formData.goal),
          image: formData.image,
          is_open: formData.is_open,
        }),
      });

      if (res.ok) {
        const updatedFundraiser = await res.json();
        alert("Woayɛ adeɛ! Fundraiser updated successfully!");
        setIsEditing(false);
        navigate(`/fundraisers/${updatedFundraiser.id}`); // refresh page
      } else {
        const errBody = await res.json().catch(() => null);
        const msg = errBody?.detail ?? errBody?.message ?? "Failed to update fundraiser";
        alert(msg);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the fundraiser");
    }
  }

  return (
    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", maxWidth: "600px", margin: "40px auto", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <h2>Edit Fundraiser</h2>

          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />

          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />

          <label>Goal (USD):</label>
          <input
            type="number"
            value={formData.goal}
            onChange={(e) => setFormData({...formData, goal: e.target.value})}
            required
          />

          <label>Image URL:</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />

          <label>
            Open:
            <input
              type="checkbox"
              checked={formData.is_open}
              onChange={(e) => setFormData({...formData, is_open: e.target.checked})}
            />
          </label>

          <button type="submit" style={{ marginTop: "15px", marginRight: "10px" }}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)} style={{ marginTop: "15px" }}>Cancel</button>
        </form>
      ) : (
        <>
          <h2>{fundraiser.title}</h2>
          {fundraiser.image && (
            <img src={fundraiser.image} alt="Fundraiser" width="300" height="250" style={{ borderRadius: "8px", objectFit: "cover", marginBottom: "15px" }} />
          )}
          <h3>Description: {fundraiser.description}</h3>
          <h3>Created on: {new Date(fundraiser.date_created).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"})}</h3>
          <h3>Pledges:</h3>
          <ul>
            {fundraiser.pledges.map((pledgeData, key) => (
              <li key={key}>
                ${pledgeData.amount} pledged by {pledgeData.supporter}: {pledgeData.comment}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "#7fbd27",
              color: "#fff",
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "20px",
              marginRight: "10px",
            }}
          >
            Edit Fundraiser
          </button>

          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Delete Fundraiser
          </button>
        </>
      )}
    </div>
  );
}

export default FundraiserPage;
