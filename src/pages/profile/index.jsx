import React, { useEffect, useState } from 'react';

const ME_QUERY = `
  query Me {
    me {
      id
      username
      email
      emailRemindersEnabled
    }
  }
`;

const UPDATE_PROFILE_MUTATION = `
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      username
      email
      emailRemindersEnabled
    }
  }
`;

async function gql(query, variables) {
    const res = await fetch('/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    return res.json();
}

export default function ProfilePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [emailRemindersEnabled, setEmailRemindersEnabled] = useState(false);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        gql(ME_QUERY).then((json) => {
            if (json.data?.me) {
                setEmail(json.data.me.email ?? '');
                setEmailRemindersEnabled(json.data.me.emailRemindersEnabled);
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        if (password && password !== confirm) {
            setStatus({ type: 'error', message: 'Passwords do not match' });
            return;
        }

        const input = { emailRemindersEnabled };
        if (email) input.email = email;
        if (password) input.password = password;

        setLoading(true);
        try {
            const json = await gql(UPDATE_PROFILE_MUTATION, { input });
            if (json.errors?.length) {
                setStatus({ type: 'error', message: json.errors[0].message || 'Update failed' });
            } else {
                setStatus({ type: 'success', message: 'Profile updated successfully' });
                setPassword('');
                setConfirm('');
            }
        } catch {
            setStatus({ type: 'error', message: 'Network error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 640, margin: '0 auto', padding: 16 }}>
            <h2>Profile Settings</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        placeholder="email address"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: 8 }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={emailRemindersEnabled}
                            onChange={(e) => setEmailRemindersEnabled(e.target.checked)}
                        />
                        Send email reminders before credit card renewal dates
                    </label>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>New Password</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="new password (leave blank to keep current)"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: 8 }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>Confirm Password</label>
                    <input
                        type="password"
                        value={confirm}
                        placeholder="confirm new password"
                        onChange={(e) => setConfirm(e.target.value)}
                        style={{ width: '100%', padding: 8 }}
                    />
                </div>

                <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
                    {loading ? 'Updating…' : 'Update'}
                </button>

                {status && (
                    <div style={{ marginTop: 12, color: status.type === 'error' ? 'crimson' : 'green' }}>
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
}
