<template>
  <!--breadcrumb-->
  <nav class="main-breadcrumb" aria-label="breadcrumb">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link class="brand" :to="{ name: 'Home' }"
              >الرئيسية</router-link
            >
          </li>
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'News' }">المقالات</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">تفاصيل المقال </li>
        </ol>
      </nav>
    </div>
  </nav>
  <!--breadcrumb-->
</template>

<script>
export default {};
</script>

<style>
</style>