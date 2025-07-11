/*import Link from 'next/link';

import ProductItem from '@/components/products/ProductItem';
import { Rating } from '@/components/products/Rating';
import productServices from '@/lib/services/productService';

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
const prices = [
  {
    name: 'Ksh1 to Ksh50',
    value: '1-50',
  },
  {
    name: 'Ksh51 to Ksh200',
    value: '51-200',
  },
  {
    name: 'Ksh201 to Ksh1000',
    value: '201-1000',
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: { q = 'all', category = 'all', price = 'all', rating = 'all' },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
  });
  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div>
        <div className='py-2 text-xl'>Categories</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${
                  'all' === category && 'link-primary'
                }`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link-hover link ${
                    c === category && 'link-primary'
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className='py-2 text-xl'>Price</div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${
                  'all' === price && 'link-primary'
                }`}
                href={getFilterUrl({ p: 'all' })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`link-hover link ${
                    p.value === price && 'link-primary'
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className='py-2 text-xl'>Customer Review</div>
          <ul className='flex flex-col gap-1'>
            <li>
              <Link
                href={getFilterUrl({ r: 'all' })}
                className={`link-hover link ${
                  'all' === rating && 'link-primary'
                }`}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`link-hover link ${
                    `${r}` === rating && 'link-primary'
                  }`}
                >
                  <Rating caption={' & up'} value={r} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='md:col-span-4'>
        <div className='flex flex-col justify-between py-4 md:flex-row'>
          <div className='flex items-center'>
            {products.length === 0 ? 'No' : countProducts} Results
            {q !== 'all' && q !== '' && ' : ' + q}
            {category !== 'all' && ' : ' + category}
            {price !== 'all' && ' : Price ' + price}
            {rating !== 'all' && ' : Rating ' + rating + ' & up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            category !== 'all' ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Link className='btn btn-ghost btn-sm' href='/search'>
                Clear
              </Link>
            ) : null}
          </div>
          <div>
            Sort by:{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`link-hover link mx-2 ${
                  sort == s ? 'link-primary' : ''
                } `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3  '>
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          <div className='join'>
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`btn join-item ${
                    Number(page) === p + 1 ? 'btn-active' : ''
                  } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
*/

import Link from 'next/link';
import { Rating } from '@/components/products/Rating';
import productServices from '@/lib/services/productService';
import ProductItem from '@/components/products/ProductItem';

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
const prices = [
  { name: 'Ksh1 to Ksh50', value: '1-50' },
  { name: 'Ksh51 to Ksh200', value: '51-200' },
  { name: 'Ksh201 to Ksh1000', value: '201-1000' },
];
const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: { q = 'all', category = 'all', price = 'all', rating = 'all' },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

const FilterLink = ({ children, href, active }: { children: React.ReactNode, href: string, active: boolean }) => (
  <Link
    href={href}
    className={`block p-2 rounded-lg transition-colors ${
      active
        ? 'bg-[#bf2c7e]/10 text-[#bf2c7e] font-medium'
        : 'hover:bg-gray-50'
    }`}
  >
    {children}
  </Link>
);

const SortButton = ({ children, href, active }: { children: React.ReactNode, href: string, active: boolean }) => (
  <Link
    href={href}
    className={`px-3 py-1 text-sm rounded-full transition-colors ${
      active
        ? 'bg-[#bf2c7e] text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {children}
  </Link>
);

const FilterBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#bf2c7e]/10 text-[#bf2c7e]">
    {children}
  </span>
);

export default async function SearchPage({
  searchParams: {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories Filter */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <FilterLink
                    active={'all' === category}
                    href={getFilterUrl({ c: 'all' })}
                  >
                    All Categories
                  </FilterLink>
                </li>
                {categories.map((c: string) => (
                  <li key={c}>
                    <FilterLink
                      active={c === category}
                      href={getFilterUrl({ c })}
                    >
                      {c}
                    </FilterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
              <ul className="space-y-2">
                <li>
                  <FilterLink
                    active={'all' === price}
                    href={getFilterUrl({ p: 'all' })}
                  >
                    Any Price
                  </FilterLink>
                </li>
                {prices.map((p) => (
                  <li key={p.value}>
                    <FilterLink
                      active={p.value === price}
                      href={getFilterUrl({ p: p.value })}
                    >
                      {p.name}
                    </FilterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ratings Filter *
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Reviews</h3>
              <ul className="space-y-3">
                <li>
                  <FilterLink
                    active={'all' === rating}
                    href={getFilterUrl({ r: 'all' })}
                  >
                    Any Rating
                  </FilterLink>
                </li>
                {ratings.map((r) => (
                  <li key={r}>
                    <Link
                      href={getFilterUrl({ r: `${r}` })}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                        `${r}` === rating
                          ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Rating value={r} caption={''} />
                      <span className="text-sm">& Up</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>*/}
          </div>

          {/* Products Section */}
          <div className="lg:col-span-4">
            {/* Header with results and sorting */}
            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-medium text-gray-700">
                    {products.length === 0 ? 'No' : countProducts} Results
                  </span>
                  {q !== 'all' && q !== '' && (
                    <FilterBadge>
                      Search: {q}
                    </FilterBadge>
                  )}
                  {category !== 'all' && (
                    <FilterBadge>
                      Category: {category}
                    </FilterBadge>
                  )}
                  {price !== 'all' && (
                    <FilterBadge>
                      Price: {prices.find(p => p.value === price)?.name}
                    </FilterBadge>
                  )}
                  {rating !== 'all' && (
                    <FilterBadge>
                      Rating: {rating} & up
                    </FilterBadge>
                  )}
                  {(q !== 'all' && q !== '') ||
                  category !== 'all' ||
                  rating !== 'all' ||
                  price !== 'all' ? (
                    <Link 
                      href="/search" 
                      className="text-sm text-[#bf2c7e] hover:text-[#9e2468] font-medium"
                    >
                      Clear All
                    </Link>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <div className="flex flex-wrap gap-2">
                    {sortOrders.map((s) => (
                      <SortButton
                        key={s}
                        active={sort === s}
                        href={getFilterUrl({ s })}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </SortButton>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <div key={product.slug} className="hover:shadow-lg transition-shadow duration-300">
                      {/* Replace with your actual ProductItem component */}
                      <ProductItem product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="join">
                      {Array.from(Array(pages).keys()).map((p) => (
                        <Link
                          key={p}
                          href={getFilterUrl({ pg: `${p + 1}` })}
                          className={`join-item btn ${
                            Number(page) === p + 1
                              ? 'btn-active bg-[#bf2c7e] text-white border-[#bf2c7e]'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {p + 1}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                <Link
                  href="/search"
                  className="mt-4 inline-block px-4 py-2 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#9e2468] transition-colors"
                >
                  Reset Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}