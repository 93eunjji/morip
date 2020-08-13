package matzip.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import matzip.bean.MatzipDTO;
import matzip.service.MatzipService;

@Controller
@RequestMapping("matzip") /* 매번 /member/login처럼 /member를 붙일 필요가 없어진다 */
public class MatzipController {
	@Autowired
	private MatzipService matzipService;
	
	// 맛집 리스트 보여주기
	@RequestMapping(value="matzipListShow",method=RequestMethod.GET)
	public String matzipListShow(Model model) {
		model.addAttribute("display", "/resources/matzip/matzipList.jsp");
		return "/resources/main/index";
	}
	
	@RequestMapping(value="matzipList",method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView matzipList(@RequestParam String address) {
		//System.out.println(address);
		List<MatzipDTO> list =matzipService.matzipList(address);
		list.remove(4);
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
		
	}
	
	@RequestMapping(value="matzipView",method=RequestMethod.GET)
	public String test2(@RequestParam String title, Model model) {
//		model.addAttribute("display", "/board/boardWriteForm.jsp");
		model.addAttribute("title", title);
		//return "/matzip/matzipView";
		model.addAttribute("display", "/resources/matzip/matzipView.jsp");
		return "/resources/main/index";
	}
	
	@RequestMapping(value="getMatzipView",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getMatzipView(@RequestParam String title) {
		//System.out.println(address);
		//System.out.println(title);
		MatzipDTO matzipDTO =matzipService.getMapzipView(title);
		ModelAndView mav = new ModelAndView();
		mav.addObject("matzip", matzipDTO);
		mav.setViewName("jsonView");
		return mav;
		
	}
	
	@RequestMapping(value="matzipSearch",method=RequestMethod.POST)
	   @ResponseBody
	   public ModelAndView matzipSearch(@RequestParam(value="matzipText") String matzipText) {
	      List<MatzipDTO> list = matzipService.matzipSearch(matzipText);
	      ModelAndView mav = new ModelAndView();
	      mav.addObject("list",list);
	      mav.setViewName("jsonView");	      
	      return mav;
	}
	
	@RequestMapping(value="getMatzipView2",method=RequestMethod.POST)
	   @ResponseBody
	   public ModelAndView getMatzipView2(@RequestParam String title) {
		MatzipDTO matzipDTO =matzipService.getMapzipView2(title);
		ModelAndView mav = new ModelAndView();
		mav.addObject("matzip", matzipDTO);
		mav.setViewName("jsonView");
		return mav;
	   }
	
	// 메인창에 맛집 3개 뿌려주기
	@RequestMapping(value="matzipThreeList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView matzipThreeList() {
		List<MatzipDTO> list = matzipService.matzipThreeList();
		System.out.println();
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;		
	}
}