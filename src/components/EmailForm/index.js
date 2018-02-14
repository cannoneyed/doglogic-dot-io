import React from 'react'
import SubscribeFrom from 'react-mailchimp-subscribe'
import styled from 'styled-components'

const formProps = {
  action:
    'https://doglogic.us17.list-manage.com/subscribe/post?u=97213734d5b0ce1d4858be710&amp;id=360faf6599',
  messages: {
    inputPlaceholder: 'email',
    btnLabel: 'subscribe',
    sending: 'submitting...',
    success: 'subscribed!',
    error: 'something went wrong',
  },
  styles: {
    sending: {
      fontSize: 12,
      color: 'auto',
    },
    success: {
      fontSize: 12,
      color: 'green',
    },
    error: {
      fontSize: 12,
      color: 'red',
    },
  },
}

export default function EmailForm() {
  return (
    <FormWrapper>
      <SubscribeFrom {...formProps} />
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  font: 400 11px 'Ubuntu Mono', monospace !important;
  input {
    color: red;
  }
`
