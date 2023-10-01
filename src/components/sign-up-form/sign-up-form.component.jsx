import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';
import { signUpStart } from '../../store/user/user.action';
//import { UserContext } from '../../contexts/user.context';

const defaultFormField = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formField, setFormField] = useState(defaultFormField);
	const { displayName, email, password, confirmPassword } = formField;
	const dispatch = useDispatch();
	//const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormField(defaultFormField);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('password does not match');
			return;
		}

		try {
			dispatch(signUpStart(email, password, displayName));
			resetFormFields();
			//	setCurrentUser(user);
		} catch (e) {
			if (e.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log('user creation encountered an error', e);
			}
		}
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormField({ ...formField, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Don`t have an account?</h2>
			<span>Sign Up with you email and password </span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				></FormInput>

				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				></FormInput>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				></FormInput>

				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				></FormInput>
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
