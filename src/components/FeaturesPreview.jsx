export default function FeaturesPreview() {
  const features = [
    {
      title: "Secure Storage",
      description: "Your files are encrypted and stored securely in our cloud infrastructure.",
      icon: "🔒",
    },
    {
      title: "Easy Access",
      description: "Access your files from anywhere, anytime with your unique number.",
      icon: "📱",
    },
    {
      title: "Multi-Format Support",
      description: "Upload images, videos, and PDFs all in one place.",
      icon: "📄",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: '#eff6ff',
        padding: '4rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#2563eb',
            marginBottom: '3rem',
          }}
        >
          Key Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#4b5563' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}