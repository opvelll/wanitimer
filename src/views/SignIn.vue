<template>
  <div class="d-flex justify-content-center">
    <amplify-authenticator :authConfig="authConfig"></amplify-authenticator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authConfig: {
        usernameAttributes: "Email",
        signUpConfig: {
          header: "ユーザー登録",
          hideAllDefaults: true,
          defaultCountryCode: "1",
          signUpFields: [
            {
              label: "Email",
              key: "username",
              required: true,
              displayOrder: 1,
              type: "string"
            },
            {
              label: "Password",
              key: "password",
              required: true,
              displayOrder: 2,
              type: "password"
            }
          ]
        }
      }
    };
  }
};
</script>