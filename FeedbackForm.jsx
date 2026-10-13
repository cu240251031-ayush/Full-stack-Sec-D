
import React, { useState } from "react";

export default function FeedbackForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = true;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = true;
        }

        if (!rating) {
            newErrors.rating = true;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
        } else {
            setSubmitted(false);
        }
    }

    return (
        <div>
            <h2>Course Feedback Form</h2>

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="name-input">Name:</label>
                    <input
                        id="name-input"
                        data-testid="name-input"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setSubmitted(false);
                        }}
                    />
                    {errors.name && (
                        <p data-testid="name-error">Name is required.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email-input">Email:</label>
                    <input
                        id="email-input"
                        type="email"
                        data-testid="email-input"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setSubmitted(false);
                        }}
                    />
                    {errors.email && (
                        <p data-testid="email-error">Enter a valid email.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="rating-select">Rating:</label>
                    <select
                        id="rating-select"
                        data-testid="rating-select"
                        value={rating}
                        onChange={(e) => {
                            setRating(e.target.value);
                            setSubmitted(false);
                        }}
                    >
                        <option value="">Select rating</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>

                    {errors.rating && (
                        <p data-testid="rating-error">Please select a rating.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="comment-input">Comment:</label>
                    <textarea
                        id="comment-input"
                        data-testid="comment-input"
                        maxLength={200}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <p data-testid="comment-count">
                        {comment.length}/200
                    </p>
                </div>

                <button type="submit" data-testid="submit-btn">
                    Submit Feedback
                </button>
            </form>

            {submitted && (
                <p data-testid="success-msg">
                    Thank you, {name.trim()}! Feedback submitted.
                </p>
            )}
        </div>
    );
}
