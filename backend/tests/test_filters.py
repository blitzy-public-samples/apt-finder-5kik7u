import pytest
from django.test import TestCase
from django.contrib.auth.models import User
from listings.models import Listing
from filters.models import Filter
from filters.services import create_filter, get_filter, update_filter, delete_filter, apply_filter_to_listings

class TestFilters(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.listing = Listing.objects.create(
            title='Test Listing',
            description='This is a test listing',
            price=100.00,
            owner=self.user
        )
        self.filter_data = {
            'name': 'Test Filter',
            'criteria': {'price__lte': 150.00},
            'user': self.user
        }

    def test_filter_creation(self):
        filter = create_filter(self.filter_data)
        self.assertIsInstance(filter, Filter)
        self.assertEqual(filter.name, 'Test Filter')
        self.assertEqual(filter.criteria, {'price__lte': 150.00})
        self.assertEqual(filter.user, self.user)

    def test_filter_retrieval(self):
        created_filter = create_filter(self.filter_data)
        retrieved_filter = get_filter(created_filter.id)
        self.assertEqual(retrieved_filter, created_filter)

    def test_filter_update(self):
        filter = create_filter(self.filter_data)
        updated_data = {
            'name': 'Updated Filter',
            'criteria': {'price__lte': 200.00}
        }
        updated_filter = update_filter(filter.id, updated_data)
        self.assertEqual(updated_filter.name, 'Updated Filter')
        self.assertEqual(updated_filter.criteria, {'price__lte': 200.00})

    def test_filter_deletion(self):
        filter = create_filter(self.filter_data)
        delete_filter(filter.id)
        with pytest.raises(Filter.DoesNotExist):
            get_filter(filter.id)

    def test_filter_application_to_listings(self):
        filter = create_filter(self.filter_data)
        matching_listings = apply_filter_to_listings(filter)
        self.assertIn(self.listing, matching_listings)

        # Create a listing that doesn't match the filter
        non_matching_listing = Listing.objects.create(
            title='Expensive Listing',
            description='This listing is too expensive for the filter',
            price=200.00,
            owner=self.user
        )
        matching_listings = apply_filter_to_listings(filter)
        self.assertIn(self.listing, matching_listings)
        self.assertNotIn(non_matching_listing, matching_listings)

# HUMAN ASSISTANCE NEEDED
# The following test cases might need to be adjusted based on the actual implementation of the filter application logic:
# - Test edge cases for filter criteria (e.g., empty criteria, invalid criteria)
# - Test filter application with different types of criteria (e.g., text search, date ranges)
# - Test performance of filter application on large datasets
# - Test concurrent filter operations (creation, update, deletion) if applicable