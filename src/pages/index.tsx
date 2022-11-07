import Head from 'next/head'

import {signIn, signOut, useSession} from 'next-auth/react'
import {trpc} from '@utils/trpc'

import {type NextPage} from 'next'
import {type Session} from 'next-auth/core/types'

const Home: NextPage = () => {
	const {data: sessionData} = useSession()
	const hello = trpc.example.hello.useQuery({text: sessionData?.user?.name})

	return (
		<>
			<Head>
				<title>Riolly Labs</title>
				<meta
					name='description'
					content="We realize that humans are just blind and fools. That's why I'm curious what can we do to make this world better for all? This lab exists for that purpose only."
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container mx-auto flex min-h-screen flex-col items-center justify-center p-4'>
				<h1 className='text-xl font-extrabold leading-normal text-gray-700 md:text-6xl'>
					Welcome home, <span className='text-blue-500'>challenger</span>!
				</h1>

				<div className='flex w-full items-center justify-center pt-6 text-2xl text-blue-500'>
					{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
				</div>
				<AuthShowcase sessionData={sessionData} />
			</main>
		</>
	)
}

export default Home

type AuthProps = {
	sessionData: Session | null
}

const AuthShowcase: React.FC<AuthProps> = ({sessionData}) => {
	const {data: secretMessage} = trpc.auth.getSecretMessage.useQuery(
		undefined, // no input
		{enabled: sessionData?.user !== undefined}
	)

	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			{secretMessage && (
				<p className='text-center text-2xl text-blue-500'>{secretMessage}</p>
			)}
			<button
				className='mt-4 rounded-md bg-sky-50 px-4 py-2 text-xl shadow-lg hover:bg-sky-100'
				onClick={sessionData ? () => signOut() : () => signIn()}
			>
				{sessionData ? 'Sign out' : 'Sign in'}
			</button>
		</div>
	)
}
