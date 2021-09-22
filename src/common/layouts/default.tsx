import React from 'react'

export default function DefaultLayout(props: any) {
  return (
    <>
      <main>
        {props.children}
      </main>
    </>
  )
}
