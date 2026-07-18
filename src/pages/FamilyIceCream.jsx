import React from 'react';

export default function FamilyIceCream() {
  return (
    <>
      <header className="page-header">
        <h1>גלידה משפחתית </h1>
        <p>טעמים משפחתיים שאפשר לחלוק עם כולם </p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="family-grid">
            {/* 
              הוסף את התמונות והתוכן שלך כאן. 
              אתה יכול להשתמש במבנה של רשת (grid) או כרטיסיות.
            */}
            <p style={{textAlign: 'center'}}>המקום שלך להוספת תמונות ותוכן לגלידה משפחתית...</p>
          </div>
        </div>
      </section>
    </>
  );
}
