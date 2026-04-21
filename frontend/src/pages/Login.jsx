import { useForm } from 'react-hook-form';
import { LogIn, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        Swal.fire({
            title: '¡Acceso Correcto!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
        login({ email: data.email });
    };

    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: '#f4f1ea' 
        }}>
            <div style={{ 
                background: 'white', 
                padding: '40px', 
                borderRadius: '15px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                width: '100%', 
                maxWidth: '380px',
                textAlign: 'center'
            }}>
                <ShieldCheck size={50} color="#d1b47b" style={{ marginBottom: '15px' }} />
                <h1 style={{ color: '#333', fontSize: '28px', marginBottom: '10px', margin: '0' }}>Iniciar Sesión</h1>
                <p style={{ color: '#777', marginBottom: '30px' }}>TechConnect Marketplace</p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        {...register("email")} 
                        placeholder="Usuario o Correo" 
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
                        required 
                    />
                    <input 
                        {...register("password")} 
                        type="password" 
                        placeholder="Contraseña" 
                        style={{ width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
                        required 
                    />
                    <button type="submit" style={{ 
                        width: '100%', 
                        padding: '14px', 
                        backgroundColor: '#333', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}>
                        Ingresar al Sistema
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;