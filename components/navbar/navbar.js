"use client"
import React from 'react'
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const user = {
  name: '',
  email: '',
  imageUrl:
    'https://miro.medium.com/v2/resize:fit:2400/1*edHEjIkFn5YuPODO7wKOYw.png',
}

const userNavigation = [
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const NavBar = (props) => {
  const {name, email, profile_image, role} = props;
  const navigation = []
  if (role === "org") {
    navigation.push(
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Edit Profile", href: "/edit-profile", current: false },
    { name: "Upload Image", href: "/upload-image", current: false },
    { name: "Shared Images", href: "/shared-images", current: false },
    { name: "My Images", href: "/my-images", current: false },
    { name: "Transactions", href: "/transactions", current: false },
    )
  }
  else {
    navigation.push(
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Edit Profile", href: "/edit-profile", current: false },
    { name: "Shared Images", href: "/shared-images", current: false },
    { name: "Transactions", href: "/transactions", current: false },
    )
  }

  const logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
      }),
    });
    const data = await res.json();
    console.log(data);
    if(res.status === 200) {
      // alert(data.message);
      console.log(data);
      window.location.href = "/auth/login";
    } else {
      alert(data.message);
    }
  };
    return (
        <>
          <Popover
            as="header"
            className={({ open }) =>
              classNames(
                open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                'bg-white shadow-sm lg:static lg:overflow-y-visible'
              )
            }
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                    <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                      <div className="flex flex-shrink-0 items-center">
                        <a href="#">
                          <img
                            className="block h-8 w-auto"
                            src="https://miro.medium.com/v2/resize:fit:2400/1*edHEjIkFn5YuPODO7wKOYw.png"
                            alt="Your Company"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                      <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                        <div className="w-full">
                          <label htmlFor="search" className="sr-only">
                            Search
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                              id="search"
                              name="search"
                              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Search"
                              type="search"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex  items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Popover.Button>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                      <a
                        href="#"
                        className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </a>
    
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-5 flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={profile_image}
                              alt=""
                              height={1000}
                              width={1000}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <button
                                    // href={item.href}
                                    onClick={logout}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <a
                        href={role==="org"?"/upload-image":"/share-image"}
                        className="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {role==="org"?"Upload Image":"Share Image"}
                      </a>
                    </div>
                  </div>
                </div>
    
                <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                  <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                      <div className="flex-shrink-0">
                      <Image
                              className="h-8 w-8 rounded-full"
                              src={profile_image}
                              alt=""
                              height={1000}
                              width={1000}
                            />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{name}</div>
                        <div className="text-sm font-medium text-gray-500">{email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                      {userNavigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={logout}
                          className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </>
      )
}

export default NavBar