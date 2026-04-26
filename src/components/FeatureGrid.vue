<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="feature-grid">
    <article
      v-for="item in items"
      :key="item.id"
      class="feature-grid__card"
    >
      <h3 class="feature-grid__title">{{ item.title }}</h3>
      <p class="feature-grid__description">{{ item.description }}</p>
    </article>
  </section>
</template>
