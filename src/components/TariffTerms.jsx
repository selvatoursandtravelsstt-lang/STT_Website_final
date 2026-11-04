function TariffTerms({ tariff, className = 'tariff-terms' }) {
  return (
    <section className={className} aria-labelledby="tariff-terms-title">
      <div className="tariff-content-heading">
        <p className="eyebrow">BEFORE CONFIRMING A TRIP</p>
        <h2 id="tariff-terms-title">Terms and Conditions</h2>
      </div>
      <ol className="tariff-terms-list">
        {tariff.terms.map((term) => <li key={term}>{term}</li>)}
      </ol>
      {tariff.termsApprovalRequired && <p className="tariff-terms-note">{tariff.termsApprovalNote}</p>}
    </section>
  )
}

export default TariffTerms
