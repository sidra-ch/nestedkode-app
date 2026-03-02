const API_URL = 'http://localhost:3000'; // Adjust if your dev server is on a different port

async function testUserFlow() {
    const timestamp = Date.now();
    const testEmail = `testuser_${timestamp}@example.com`;
    const testPassword = 'password123';
    const testName = `Test User ${timestamp}`;

    console.log('--- 1. Testing Registration ---');
    try {
        const regRes = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: testName,
                email: testEmail,
                password: testPassword,
                phone: '09120001234'
            })
        });

        const regData = await regRes.json();
        if (regRes.ok) {
            console.log('✅ Registration Successful!');
            console.log('User Data:', regData.user);
        } else {
            console.error('❌ Registration Failed:', regData.message);
            return;
        }

        console.log('\n--- 2. Testing Login ---');
        const loginRes = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testEmail,
                password: testPassword
            })
        });

        const loginData = await loginRes.json();
        if (loginRes.ok) {
            console.log('✅ Login Successful!');
            console.log('Welcome,', loginData.user.name);
            console.log('Last Login:', loginData.user.lastLogin || 'Not tracked yet');
            console.log('Login Count:', loginData.user.loginCount);

            console.log('\n--- Result ---');
            console.log('Test completed successfully. You can now login as admin@demo.com');
            console.log('in your browser to see this user in the "آخرین فعالیت کاربران" table.');
        } else {
            console.error('❌ Login Failed:', loginData.message);
        }

    } catch (error) {
        console.error('❌ Network Error:', error.message);
        console.log('Make sure your development server (npm run dev) is running on', API_URL);
    }
}

testUserFlow();
