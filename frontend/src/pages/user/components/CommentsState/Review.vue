<template>
  <tr>
    <td></td>
    <td class="review">
      <p class="meta">
        {{ review.rating }} · <span class="italic">{{ review.reviewer }}</span>
      </p>
      <p>
        {{ displayedComment }}
        <span class="more" v-if="hasMore" @click="expand">more</span>
        <span class="more" v-if="hasLess" @click="collapse">collapse</span>
      </p>
    </td>
    <td></td>
  </tr>
</template>

<script>
export default {
  name: "Review",
  props: {
    review: Object,
  },
  data() {
    return {
      hasMore: false,
      hasLess: false,
    };
  },
  computed: {
    displayedComment() {
      if (this.hasMore) {
        return this.review.comment.split(" ").slice(0, 200).join(" ") + "...";
      } else {
        return this.review.comment;
      }
    },
  },
  methods: {
    expand() {
      this.displayedComment = this.review.comment;
      this.hasMore = false;
      this.hasLess = true;
    },
    collapse() {
      this.displayedComment =
        this.review.comment.split(" ").slice(0, 200).join(" ") + " ...";
      this.hasMore = true;
      this.hasLess = false;
    },
  },
  created() {
    let words = this.review.comment.split(" ");
    if (words.length > 200) {
      this.collapse();
    }
  },
};
</script>

<style scoped>
.meta {
  font-weight: bold;
}
.italic {
  font-style: italic;
}

.review {
  font-family: "Lato";
  font-size: 1.5rem;
}

.more {
  text-decoration: underline;
  color: #5d5d81;
}

.more:hover {
  cursor: pointer;
}
</style>
