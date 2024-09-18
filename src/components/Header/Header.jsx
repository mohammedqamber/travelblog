import React, { useEffect } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, X, AlignRight, CircleUserRound } from 'lucide-react'
import { Transition } from '@headlessui/react'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

function Header() {

  let authStatus =  useSelector(state => state.status)
  const userData = useSelector(state => state.userData)
  const navigate = useNavigate()
  console.log(userData);

  useEffect(()=>{
     authStatus = true
  },[])

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus
    },

    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus
    }
  ]


  return (
    <>
      <header className='py-6  flex  z-50 w-full fixed text-gray-100 bg-navbarBg transition-all ease-in duration-200'>
        <Container>
          <nav className='flex  justify-between'>
            <div className='mr-4'>
              <Link to="/">
                <Logo />
              </Link>
            </div>

            <div className='hidden lg:block'>
              <ul className='flex items-center'>
                {
                  navItems.map((item) =>
                    item.active ? (
                      <li className="mx-3" key={item.name}>
                        <Link to={item.slug}>
                          {item.name}
                        </Link>
                      </li>


                    ) : null
                  )
                }
                {/* Below syntax if first one is true then only second statement after && will run */}
                {authStatus &&
                  <li className='ml-9 flex'>

                    <Popover>
                      <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white hover:data-[open] data-[focus]:outline-1 data-[focus]:outline-white">
                        <CircleUserRound />
                      </PopoverButton>

                      <PopoverPanel
                        transition
                        anchor="bottom"
                        className="mt-6 divide-y divide-white/5  bg-navbarBg text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                      >
                        <div className="p-3">
                          <h1  className="font-semibold text-white text-center" >{userData.name}</h1>
                          
                        </div>
                        <div className="p-3 m-auto">
                          <LogoutBtn />
                        </div>
                      </PopoverPanel>
                    </Popover>

                  </li>
                }
              </ul>
            </div>

            <div className="lg:hidden">
              {
                isMenuOpen ? <X onClick={toggleMenu} /> : <Menu onClick={toggleMenu} className="cursor-pointer" />
              }
            </div>

          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <Transition
              show={isMenuOpen}
              enter="transition ease-in-out duration-[200ms]"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-100 -translate-y-3"
            >

              <div className="flex flex-col mt-2 space-y-4  lg:hidden  w-full">
                <ul className='flex flex-col items-center justify-center'>
                  {
                    navItems.map((item) =>
                      item.active ? (
                        <li onClick={toggleMenu} className="mx-3 py-3" key={item.name}>
                          <Link to={item.slug}>
                            {item.name}
                          </Link>
                        </li>


                      ) : null
                    )
                  }
                  {authStatus && (
                    <li className=' py-4'>
                      <LogoutBtn />
                    </li>
                  )}
                </ul>
              </div>

            </Transition>
          )}



        </Container>
      </header>



    </>
  )
}

export default Header
