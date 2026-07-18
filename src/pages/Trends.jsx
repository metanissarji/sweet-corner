import React from 'react';
import './Trends.css'; // Optional CSS file if you want to style this page specifically

export default function Trends() {
  return (
    <>
      <header className="page-header">
        <h1>טרנדים </h1>
        <p>הטרנדים החמים והחדשים ביותר שלנו! </p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="trends-grid">
            {/* 
              הוסף את התמונות והתוכן שלך כאן. 
              אתה יכול להשתמש במבנה של רשת (grid) או כרטיסיות.
            */}
            <p style={{textAlign: 'center'}}>המקום שלך להוספת תמונות ותוכן לטרנדים...</p>
          </div>
        </div>
      </section>
    </>
  );
}
