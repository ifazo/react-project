const XCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 9L9 15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9L15 15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.49 9C19.9828 7.56678 19.1209 6.2854 17.9845 5.27542C16.8482 4.26543 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1113 10.0083 20.7757C8.52547 20.4402 7.15185 19.7346 6.01547 18.7246C4.87909 17.7146 4.01718 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Button = ({ children, onClick, primary = true }) => {

  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: primary ? '#3b82f6' : 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8px',
        marginRight: '8px',
        transition: 'all 0.3s ease',
        outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

export default function CancelPage() {
  const handleTryAgain = () => {
    window.location.reload()
  }

  const handleReturnHome = () => {
    window.location.href = '/'
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f7fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <div style={{
          margin: '0 auto 24px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#fee2e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <XCircleIcon />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginBottom: '16px' }}>
          Payment Cancelled
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '24px' }}>
          Your payment was not processed. This could be due to cancellation or an error in the payment process.
        </p>
        <p style={{ color: '#4b5563', marginBottom: '24px' }}>
          If you'd like to complete your purchase, please try again or contact our support team for assistance.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button onClick={handleTryAgain} primary={true}>
            <RefreshIcon style={{ marginRight: '8px', stroke: 'white' }} />
            Try Again
          </Button>
          <Button onClick={handleReturnHome} primary={false}>
            <HomeIcon style={{ marginRight: '8px', stroke: 'white' }} />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}